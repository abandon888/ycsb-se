<h1>YCSB-SE</h1>

**适用于无服务器计算工作流的基准测试工具。**

<p align="center">
  <a href="#overview">总览</a> • <a href="#documentation">文档</a>
  <!-- • <a href="#install">Installation</a> • <a href="#usage">Usage</a> • <a href="#performance">Performance</a>  -->
  • <a href="./README.md" target="_blank">English</a>
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

## 总览

**Ycsb-se** 是适用于无服务器计算工作流的基准工具。它基于 [YCSB](https://github.com/brianfrankcooper/YCSB)，这是一种流行的云数据库基准测试工具。

项目整体使用 Node.js 编写，以便于在不同的云平台上部署。

Ycsb-se 旨在评估无服务器计算工作流的性能，这些工作流由多个功能组成。Ycsb-se 可用于评估无服务器计算工作流在延迟、吞吐量和成本方面的性能。

<div id="documentation"></div>

## Documentation

注意：文档仍在建设中。
项目目前已支持的云函数有：

- [ ] [AWS Lambda](https://aws.amazon.com/lambda/)
- [ ] [Azure Functions](https://azure.microsoft.com/en-us/services/functions/)
- [x] [alibaba Cloud Function Compute](https://www.alibabacloud.com/product/function-compute)

项目目前已支持的数据库有：

- [x] [MongoDB](https://www.mongodb.com/)
- [x] [Redis](https://redis.io/)
- [x] [Cassandra](https://cassandra.apache.org/)

### 调用方法

```json
{
  "dbType": "mongodb",
  "workloadType": "A"
}
```

### 返回结果

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

> 冷启动性能数据不便监测，因此返回 N/A。可结合云平台监控数据进行分析。
