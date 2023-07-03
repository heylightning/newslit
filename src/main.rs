#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
extern crate rocket_cors;

use reqwest::Client;
use select::document::Document;
use select::predicate::Name;
use std::collections::HashSet;
use serde::{ Deserialize, Serialize };
use rocket_cors::{ CorsOptions, AllowedOrigins };

#[derive(Serialize, Deserialize)]
struct ResponseOBJ {
    href: String, 
    title: String,
    tag: String, 
    key: String,
}

#[get("/")]
fn rockit() -> String {
    match newslit_api() {
        Ok(main_content) => main_content,
        Err(e) => e.to_string(),
    }
}

#[tokio::main]
async fn newslit_api() -> Result<String, Box<dyn std::error::Error>> {
    let url = "https://www.entrepreneur.com/"; 

    let client = Client::new();
    let res = client.get(url).send().await?;

    let body = res.text().await?;

    let document = Document::from(body.as_str());

    let mut hreflist: HashSet<String> = HashSet::new();
    let mut objcontent: String = "[ ".to_string();

    for node in document.find(Name("a")) {
        if let Some(href) = node.attr("href") {
            if href.starts_with("/lifestyle/") || href.starts_with("/leadership/") || href.starts_with("/starting-a-business/") || href.starts_with("/technology/") || href.starts_with("/money-finance/") || href.starts_with("/growing-a-business/") || href.starts_with("/science-technology/") || href.starts_with("/living/") || href.starts_with("/business-news/") {
                
                let temphref = "https://www.entrepreneur.com".to_string() + href;
                hreflist.insert(temphref);

                for content in &hreflist {

                    let construct_a: Vec<&str> = content.split("/").collect();
                    let construct_b: Vec<&str> = construct_a[4].split("-").collect();
                    
                    let response: ResponseOBJ = ResponseOBJ {
                        href: format!("{}", content),
                        title: format!("{}", construct_b.join(" ").to_uppercase()),
                        tag: format!("{}", construct_a[3]),
                        key: format!("{}", construct_a[5]),
                    };
                    let json = serde_json::to_string(&response).unwrap();
                    objcontent = objcontent + &json + ",";
                }
            }
        }
    }

    let main_content = &objcontent[0..(objcontent.len() - 1)];
    let main_content = main_content.to_string() + " ]";

    Ok(main_content)
}

fn main()  {
    let cors  = CorsOptions::default()
        .allowed_origins(AllowedOrigins::all())
        .to_cors().unwrap();

    rocket::ignite().mount("/", routes![rockit]).attach(cors).launch();
}