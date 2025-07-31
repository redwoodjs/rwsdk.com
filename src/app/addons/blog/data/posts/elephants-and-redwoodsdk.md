---
title: "Using RedwoodSDK to Help Elephants and Humans Coexist in Victoria Falls."
description: "In this article we explore how we assist in monitoring Elephants in Southern Africa with RedwoodSDK."
date: "2025-07-16"
author:
  id: "herman"
heroImage: "ddc0df82-3a1d-4897-2f05-2f7c1fc6bc00"
ogImage: "https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/6729edba-1110-4595-dd1c-4fd8de0cfe00/public"
tags: ["redwoodsdk", "cloudflare", "coding for good", "conservation"]
---
# Using RedwoodSDK to Help Elephants and Humans Coexist in Victoria Falls

In the world of software development, it’s not every day you get to contribute to something that helps protect one of the planet’s most iconic species. I have been fortunate to spend years in the field in Southern Africa implementing technology to prevent wildlife crime and Human-Wildlife Conflict (HWC) with my degree in Nature Conservation and Software development background. And this is exactly what I got to do through our recent work with the [Connected Conservation Trust (CCT)](https://www.connectedconservation.com/) and [**cbio**](https://za.linkedin.com/in/craig-beech-98101318) in Zimbabwe.

CCT is leading the charge to monitor elephant movement in and around **Victoria Falls**, where rapid urban development increasingly intersects with traditional wildlife corridors. The challenge? Human-Wildlife Conflict; a growing concern in areas where communities and wildlife share shrinking space.

To tackle this, elephants are fitted with GPS collars that stream real-time location data. But raw data alone doesn’t tell a story—it needs to be parsed, cleaned, and transformed into something usable for scientists, conservationists, and planners.

That’s where we came in.

![An elephant getting collared](https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/c503d290-ee61-4a65-3d24-ee6e7372a400/public)

## Simplifying the Data Pipeline with RedwoodSDK

Using **RedwoodSDK**, we built a streamlined solution to connect CCT’s elephant collar data API with their **ArcGIS Online** environment, where spatial analysis and visualisation takes place. This integration allows real-time GPS data from collared elephants to be automatically ingested, processed, and mapped—removing complexity and reducing manual steps.

We simplified the pipeline architecture to make it **resilient and easy to maintain**, ensuring data keeps flowing even in low-connectivity environments. Best of all, we provided this solution **pro bono** as part of our commitment to _“coding for good”_—because we believe in using technology to make a meaningful impact where it’s needed most.

## From GPS Points to Conservation Insights

Thanks to this pipeline, CCT and their partners can visualise elephant movement patterns across seasons, habitats, and land use zones in near real-time. Some elephants streak across vast distances; others remain tightly bound to specific areas depending on the time of year and availability of food and water.

ArcGIS transforms these data points into beautiful and informative visualisations, such as movement tracks that resemble neural pathways stretching across the landscape. These maps help identify safe passages for wildlife, areas of potential conflict, and opportunities for better land-use planning.

The work also supports tools like the **Land Use Conflict Identification Strategy (LUCIS)**, which guides inclusive, evidence-based development decisions involving government, conservationists, and local communities.

![ArcGIS visualisation by CBIO to show paths of elephants in Zimbabwe near Victoria Falls](https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/2a868f86-d594-4d2d-2d08-b6f6a66f7000/public)

## Simple tech

RedwoodSDK is built on web standards. This means there is no hidden magic, and with this comes simplicity, reliability and control. The setup for this application was super simple and straightforward, leveraging a few key concepts of **RedwoodSDK and Cloudflare**.

At the heart our app has a cronjob that runs on schedule to retrieve new data from the collar API. This data is then cleaned and stored on a D1 database. After this it’s passed on to the **ArcGIS Feature Server** where [cbio](https://www.cbio.co.za/) builds dashboards and insights with the cleaned data.

![Adding the Cronjob to RedwoodSDK](https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/a7f145c8-e631-45ee-c8be-7c0cbbf62600/public)
![Adding the Cronjob to RedwoodSDK - wrangler config](https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/c0e87338-0074-40ae-e831-f95e77c0c700/public)

Prior to this their stack was running on 3 separate services in Google Cloud and this cost the team a fair bit of monthly subscriptions. _We simplified their setup to have it all running in **Cloudflare in a single worker at $0.00 cost**._

## Building Technology That Matters

At the core of this project is a belief that **technology can—and should—serve a purpose greater than itself**. By using tools like RedwoodSDK to bridge data collection and spatial analysis, we’re proud to support the people on the ground who are working tirelessly to ensure a future where **both people and elephants can thrive**.

---

_If you’re a technologist, GIS analyst, or conservation partner interested in similar collaborations, we’d love to connect. Sometimes, a few lines of code can go a long way—especially when they help protect a species._
