# Design

## Overview
<!--
    Google Drawing published as of 12/13/2020
    (File>Publish To Web>Embed)
--->
<br>

***As of 10/30/2020, cloud provider is*** **AWS**

![image](https://docs.google.com/drawings/d/e/2PACX-1vS-xo1naiU-WFDEQqIL_xOP1OxQUJFwtEnqAnGQp3jXMzjq1RiGp3HQj-CHXlAErTiyngfxy83sxr2x/pub?w=734&amp;h=515)


| Step | Description | Handler |
| ---- | --- | --- |
| 1 | User requests S3 pre-signed URL for future upload permission to bucket | presignedurl/request.handler
| 2 | User uploads images to be analyzed directly to S3 using pre-signed URL | None
| 3 | On S3 upload event, processing started for uploaded image | upload/request.handler
| 4 | On process completion, outputs uploaded to S3 | TBD
| 5 | User prompted to download process outputs | TBD
| 6 | User downloads process outputs directly from S3 using pre-signed URL| TBD
