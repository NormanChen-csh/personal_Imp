<!-- 2020.11.25 author： csh -->

# Ris_v1前端业务流程梳理

主要分为三个部分，其中比较复杂的是第一点

1. **远程影像诊断流程完善**
2. UI界面优化
3. 影像诊断功能完善及优化

## 一.远程影响诊断流程完善

### v1.0新增了 报告中和审核中两种状态

报告中：报告医师书写报告----报告完成
审核中：审核医师审核报告----审核完成

### v1.0新增了外院分诊

用户点击影像诊断页面的外院分诊,回跳到一个指定机构分诊和指定医师分诊页面，其中指定医师分诊，当选择报告医师，没有指定审核医师的情况下，审核医师默认选中报告医师（可修改），如果报告医师没有审核医师权限则审核医师用户自己选择

几个相关场景介绍

1. 院内诊断 分为单角色权限和双角色权限（报告+审核）流程



2. 院外分诊：远程诊断（报告）流程

3. 院外分诊：远程诊断(审核)流程

4. 远程专家会诊流程


#### 需要注意的是远程诊断存在多级概念

1、诊断状态全集：未报告、报告中、未审核、审核中、已审核

1.1 院内模式(例旧设计)：未报告、未审核、已审核

未报告：初始状态或审核医师审核驳回报告(需要显示退回标识和驳回理由)

报告中：报告医师书写报告----报告完成

未审核：报告医师报告完成待审核医师审核

审核中：审核医师审核报告----审核完成

已审核：审核医师完成报告



1.2 远程诊断(报告)模式(单级分诊A-->B)：

1.2.1 申请方状态A：未报告、报告中、未审核、审核中、已审核

未报告：初始状态或外院B退回任务(需要显示退回标识和退回理由)

未报告：对应B未报告状态

报告中：对应B报告中状态

未审核：对应B未审核状态

审核中：对应B审核中状态

已审核：对应B已审核状态

1.2.2 接收方状态B：未报告、报告中、未审核、审核中、已审核

未报告：初始状态或审核医师审核驳回报告(需要显示退回标识和驳回理由)或报告医师放弃报告(需要显示放弃标识和放弃理由)

报告中：报告医师书写报告----报告完成

未审核：报告医师完成报告或审核医师放弃审核(需要显示放弃标识和放弃理由)

审核中：审核医师审核报告----审核完成

已审核：审核医师完成报告



1.3 远程诊断(报告)模式(单级分诊A-->B-->C)：

1.3.1 申请方状态A：未报告、报告中、未审核、审核中、已审核

未报告：初始状态或外院B退回任务(需要显示退回标识和退回理由)

未报告：对应B未报告状态

报告中：对应B报告中状态

未审核：对应B未审核状态

审核中：对应B审核中状态

已审核：对应B已审核状态

1.3.2 接收方状态B：未报告、报告中、未审核、审核中、已审核

未报告：初始状态或外院C退回任务(需要显示退回标识和退回理由)

未报告：对应C未报告状态

报告中：对应C报告中状态

未审核：对应C未审核状态

审核中：对应C审核中状态

已审核：对应C已审核状态

1.3.3 接收方状态C：未报告、报告中、未审核、审核中、已审核：具体同上



1.4.1 申请方状态A：未报告、报告中、未审核、审核中、已审核

未报告：初始状态或B审核驳回(需要显示驳回标识和驳回理由)

报告中：报告中状态

未审核：对应B未审核状态

审核中：对应B审核中状态

已审核：对应B已审核状态

1.4.2 接收方状态B：未审核、审核中、已审核

未审核：初始状态或审核医师放弃审核(需要显示放弃标识和放弃理由)

审核中：审核医师审核报告----审核完成

已审核：审核医师完成报告



1.5 远程诊断(审核)模式(多级分诊A-->B-->C)：

1.5.1 申请方状态A：未报告、报告中、未审核、审核中、已审核

未报告：初始状态或C审核驳回(需要显示驳回标识和驳回理由)

报告中：A报告中状态

未审核：对应B未审核状态

审核中：对应B审核中状态

已审核：对应B已审核状态

1.5.2 接收方状态B：未审核、审核中、已审核

未审核：初始状态或外院C退回任务(需要显示退回标识和退回理由)

审核中：对应C审核中状态

已审核：对应C已审核状态

1.5.3 接收方状态C：未审核、审核中、已审核

未审核：初始状态或审核医师放弃审核(需要显示放弃标识和放弃理由)

审核中：审核医师审核报告----审核完成

已审核：审核医师完成报告

说明：任务退回----退回至上一级发起方，报告审核驳回----驳回至报告医师



在v1版本，对影像诊断进行了重构，将页面进行了改版，所以涉及以上场景的前端流程逻辑，是以**权限按钮**的形式来展示，比如对应任务的**书写报告、审核报告、修改报告、查看报告、查看影像、申请单、修改患者信息、下载影像、分享影像、撤回、退回、删除**权限

前端拿到对应单条任务数据根据相应的字段来判断该任务是否具有各种场景下的特定权限，下面对各种按钮的权限进行了归纳总结：

## RIS_v1影像诊断按钮权限解释更新时间20201125

影像诊断按钮权限代码文件controlsPermission.js

### 任务状态码统计

1：未报告
2：未审核
3：已审核
4：驳回
5：退回
6：未处理
8：未会诊
9：已会诊
10：处理中
11：会诊中
12：已终止
13：报告中
14：审核中

### taskStatus状态码统计

  INITIAL_101("初始", 101)

  ABANDON_102("放弃", 102)

  RETURN_103("退回", 103)

  REVOKE_104("撤回",104),

  NOTREATED_201("待处理", 201)

  NOAPPROVAL_202("待审批", 202)

  PROCESS_203("处理中",203)

  CONSULTATION_204("会诊中",204)

  NOWRITTEN_301("未编写", 301)

  WRITTEN_302("编写中", 302)

  NOMODIFY_303("未修改", 303)

  MODIFY_304("修改中", 304)

  NOTPASSED_305("待通过", 305)

  FINISH_401("已完成", 401)

### 权限按钮解释

#### 1.是否可以写报告 isEnableWriteReport

conditionUnreport： 未报告 && 有writeReport权限（专家会诊taskLevel=1 consultantWriteReport是这个权限） && 报告医生Id不存在或是自己

conditionReporting：报告中 && 报告机构和任务所属机构相同 && 是医生自己
return conditionUnreport || conditionReporting

#### 2.是否可以审查专家报告 isEnableCheckExpertReport

未报告 && 有taskAudit权限
return  isUnCheck(row.reportStatus) && hasPermission('taskAudit')

#### 3.是否可以修改报告 isEnableModifyReport

##### 三种情况：

  1. isUnCheck(row.reportStatus) && isSelf(row.reportDoctorId)
  未审核 && 是医生自己

  2. isSelf(row.reviewDoctorId) && row.beReviewReportTimeOut
  是医生自己 && 1: 未超时，可以二次审核

  3. isChecked(row.reportStatus) && (isSelf(row.reviewDoctorId) && row.beReviewReportTimeOut || hasPermission('report_revise’))
  已审核 && （是医生自己 && 1: 未超时，可以二次审核  || 有report_revise权限）
  **ps: 审核医生审核自己未超时的报告**

#### 4.是否可以审核报告 isEnableCheckReport

uncheckCondition：isUnCheck(row.reportStatus) && hasPermission('auditReport') && (!row.reviewDoctorId || isSelf(row.reviewDoctorId))
未审核 && 有auditReport权限 && （存在审核医师 || 是审核医师自己）

checkingCondition：isChecking(row.reportStatus) && row.toOrgNo === row.orgNo && isSelf(row.reviewDoctorId)
审核中 && 报告机构和任务所属机构相同 && 是医生自己
return uncheckCondition || checkingCondition

#### 5.是否可以审查专家报告 isEnableCheckExpertReport

isUnCheck(row.reportStatus) && hasPermission('taskAudit')
未审核 && 有taskAudit权限

#### 6.是否可以查看报告 isEnablePreviewReport

return isChecked(row.reportStatus) || isConsultationed(row.reportStatus)

#### 7.是否可以查看影像 isEnablePreviewDicom

默认true

#### 8.是否可以申请单 isEnableRequestNote

默认true

#### 9.是否可以外院分诊 isEnableOuterDiagnose

##### 有三种情况是不允许的：

1. !hasPermission('push_outer') || ![1, 2, 4].includes(reportStatus)
没有push_outer权限 ||  未报告 未审核 驳回三个状态之一

2. 存在未报告或者是未审核之外的状态

3. 存在分配过的任务

#### 10.是否可以上传影像 isEnableUploadDicom

有manual_upload权限

#### 11.是否可以下载影像 isEnableDownloadDicom

有downloadImaging权限

#### 12.是否可以删除任务 isEnableDeleteTask

hasPermission('deleteTask') && row.uploadTag && row.taskMode && [1, 5].includes(row.reportStatus)

有deleteTask权限 && 运营上传的dicom && 任务是本机构（taskMode为前端自定义toOrgNo === viewerOrgNo）  && 未报告和退回状态

#### 13.是否可以分享任务 isEnableShareDicom

有shareImaging 权限

#### 14.是否可以撤回任务 isEnableWithdrawTask

return fromOrgNo === viewerOrgNo && toOrgNo !== viewerOrgNo && [6, 8].includes(reportStatus) && hasPermission('revokeTask’)

来源方机构号等于影像所属机构 && 报告方机构号不等于影像所属机构 && 未处理和未会诊状态 && 有revokeTask权限

#### 15.是否可以解锁任务 isEnableUnlockTask

hasPermission('unLock') && row.taskLockStatus
有unLock权限 &&  任务锁定状态为true

#### 16.是否可以退回任务 isEnableRefuseTask

toOrgNo !== viewerOrgNo && (isUnreported(reportStatus) || (isUnCheck(reportStatus) && auditType === 1 ))

报告方机构不等于影像所属机构 && （未报告 || 未审核 && 申请外机构审核标识(本院0，外院1)）

#### 17.是否可以修改患者信息 isEnableModifyPatientInfo

有editPatientInfo权限

#### 18.是否可以终止会诊 isEnableTerminateConsultant

isUnHandle(row.reportStatus) || isUnConsultant(row.reportStatus)
未处理 || 未会诊

#### 19.是否可以审核申请 isEnbaleApplyCheck

未审核

#### 20.是否可以查看申请单  isEnablePreviewRN

！未审核   =》未审核就不能查看申请

#### 21.是否可以重新审核 isEnablePreviewRN

isChecked(row.reportStatus) && row.taskStatus === 301
已审核 && 任务状态为301（未编写）

#### 22.是否可以远程会诊 isEnbaleRemoteApply

有 remote_apply权限

## 二.UI界面优化

前端这次在v1做的优化有，影像诊断页面UI改版，将全局的搜索查询抽象成一个公共组件，然后通过字典相关配置来实现搜索栏的通用化处理。

### 公共搜索组件

公共搜索组件可参考ComplexSearch.vue和SimpleSearch.vue。搜索的参数是根据列表的配置来进行key值的请求，所以JSON配置参考tableConfig.js。

### 侧边栏菜单

侧边栏菜单需要维护一个MENUS_LIST.js，此文件和中央管理端的MENUS_LIST.js同步配置，通过/user/info接口的resouceKey来生成用户所拥有的的权限菜单，有极少数几个菜单是需要特殊处理写在页面组件上。

## 三.影像诊断功能完善及优化

### 报告页优化

### 字体设置

富文本框的字体在每次修改之后会调用/report/setting/add接口把字体设置上传，每次打开页面的时候会调用font接口拿到配置，wangEditor这个插件在默认无内容的时候无法修改字体，所以修改字体会自动加div和p标签在提交数据的时候影响判断，目前已经用正则处理了

### 历史检查

数字显示：编辑报告时，历史检查数量>0时，需要标红显示。

### 修改患者信息受中央管理端控制

1、当该用户有该权限时，显示该按钮

2、如果没有该权限，则不显示该按钮

### 关键词检索

列表页有影像学所见和影像学诊断，其中鼠标移上去展示全部内容，在报告页有一个关于危急值的配置，如果这个值为true，列表鼠标移上去的效果危急值要标红，反之不用；关于影像学所见和影像学诊断的搜索查询功能，查询到的列表值，以这种形式展示 **...一二三+搜索关键字（标红）+一二三...**，鼠标移上去的效果和正常列表效果一样。

### 报告锁问题

为了防止医生同时编辑相同的报告，新增了一个报告锁。
在进入页面，修改报告，书写报告，审核报告的时候立刻调用/task/doctor/tryLock接口，防止其他医生编辑相同报告，当提交报告之后，在reportBox.vue路由勾子beforeRouteLeave那里调接口/task/doctor/close解锁

### 质控统计

机构统计-》质控统计

其中阳性率、传染病、危急值都用了同样的组件进行复用,用了complexSearch.vue和src/components/common/normalCountTable.vue

### 这次修改的几个关键页文件 （cmd + p输入搜索）

1. 报告页面 reportBox.vue
2. 影像诊断 diagnosticImaging.vue
3. 质控统计-阳性率统计 positiveStatistics.vue
4. 质控统计-传染病统计 pestilenceStatistics.vue
5. 质控统计-危急值统计 criticalStatistics.vue
6. 机构管理-报告设置-诊断模板  diagnosticTemplate.vue
7. 影像诊断 - 远程诊断 diagnoseOuter.vue
