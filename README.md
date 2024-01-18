<h1>YCSB-SE</h1>

**A benchmark tool adapted to Serverless computing workflows.**

<p align="center">
  <a href="#overview">Overview</a> • <a href="#documentation">Documentation</a>
  <!-- • <a href="#install">Installation</a> • <a href="#usage">Usage</a> • <a href="#performance">Performance</a>  -->
  • <a href="./README-ZH.md" target="_blank">简体中文</a>
<br>
</p>

<p align="center">

<!-- <a href='https://bmtrain.readthedocs.io/en/latest/?badge=latest'>
    <img src='https://readthedocs.org/projects/bmtrain/badge/?version=latest' alt='Documentation Status' />
</a>

<a href="https://github.com/OpenBMB/BMTrain/releases">
    <img alt="GitHub release (latest by date including pre-releases)" src="https://img.shields.io/github/v/release/OpenBMB/BMTrain?include_prereleases">
</a>

<a href="https://github.com/OpenBMB/BMTrain/blob/main/LICENSE">
    <img alt="GitHub" src="https://img.shields.io/github/license/OpenBMB/BMTrain">
</a> -->

</p>

</div>
<!-- 
## What's New

- 2022/12/15 **BMTrain** [0.2.0](https://github.com/OpenBMB/BMTrain/releases/tag/0.2.0) released. See the [update log](docs/UPDATE_0.2.0.md).
- 2022/06/14 **BMTrain** [0.1.7](https://github.com/OpenBMB/BMTrain/releases/tag/0.1.7) released. ZeRO-2 optimization is supported!
- 2022/03/30 **BMTrain** [0.1.2](https://github.com/OpenBMB/BMTrain/releases/tag/0.1.2) released. Adapted to [OpenPrompt](https://github.com/thunlp/OpenPrompt)and [OpenDelta](https://github.com/thunlp/OpenDelta).
- 2022/03/16 **BMTrain** [0.1.1](https://github.com/OpenBMB/BMTrain/releases/tag/0.1.1) has publicly released the first stable version, which fixes many bugs that were in the beta version.
- 2022/02/11 **BMTrain** [0.0.15](https://github.com/OpenBMB/BMTrain/releases/tag/0.0.15) has publicly released the first beta version. -->

<div id="overview"></div>

## Overview

**YCSB-SE** is a benchmark tool adapted to Serverless computing workflows. It is based on [YCSB](https://github.com/brianfrankcooper/YCSB), a popular benchmark tool for cloud databases.

The whole project is written in Node.js for easy deployment on different cloud platforms.

YCSB-SE is designed to evaluate the performance of Serverless computing workflows, which are composed of multiple functions. YCSB-SE can be used to evaluate the performance of Serverless computing workflows in terms of latency, throughput, and cost.

<div id="documentation"></div>

## Documentation

Note: The documentation is still under construction.

The cloud functions currently supported by the project are:

- [ ] [AWS Lambda](https://aws.amazon.com/lambda/)
- [ ] [Azure Functions](https://azure.microsoft.com/en-us/services/functions/)
- [x] [alibaba Cloud Function Compute](https://www.alibabacloud.com/product/function-compute)

The databases currently supported by the project are:

- [x] [MongoDB](https://www.mongodb.com/)
- [x] [Redis](https://redis.io/)
- [x] [Cassandra](https://cassandra.apache.org/)

### Call method

```json
{
  "dbType": "mongodb",
  "workloadType": "A"
}
```

### Return Results

```json
{
  "coldStartDuration": "N/A",
  "dbConnectionTime": "63ms",
  "totalFunctionExecutionTime": "339ms",
  "performanceReport": {
    "totalTime": 264,
    "totalOperations": 100,
    "successfulOperations": 50,
    "failedOperations": 50,
    "averageDuration": 2.44,
    "throughput": 189.39393939393938
  }
}
```

> Cold start performance data is inconvenient to monitor, so N/A is returned. Can be combined with cloud platform monitoring data for analysis.
