import React, { useState } from "react";
import XLSX from "xlsx";
import { Table, Button, Upload, Icon } from "antd";

export default props => {
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [origin, setOrigin] = useState([]);
  // 导入excel
  function uploadExcel(info) {
    // upload接受到的数据
    console.log("upload接收到的数据:info....", info);
    let reader = new FileReader();
    reader.onload = evt => {
      console.log("reader读取完的数据:readResult....", evt);
      //读出excel文件
      const wb = XLSX.read(evt.target.result, { type: "binary" });
      console.log("excel文件...", wb);
      //读出第一张Excel表
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      console.log("第一张表的名字:wsname...", wsname);
      console.log("第一张表的数据:ws...", ws);
      //把第一张表的数据转换为json对象
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const wss = XLSX.utils.json_to_sheet(data, {
				header: ["0", "1", "2", "3"],
				skipHeader:true
      });
      console.log("第一张表的数据:wss...", wss);
      console.log("第一张表的JSON格式数据:webbooks...", data);
      setOrigin(data);
      // 处理表头数据
      setColumns(
        data[0].map((item, index) => {
          return {
            title: item,
            dataIndex: index,
            key: index
          };
        })
      );
      //处理表格数据
      setDataSource(
        data.slice(1).map((item, index) => {
          return { ...item, key: index };
        })
      );
    };
    reader.readAsBinaryString(info.file.originFileObj);
  }

  // 导出excel
  function exportExcel() {
    if (!dataSource.length) {
      return;
    }
    //合并数据
    let origin=[columns.map(val=>val.title)].concat(dataSource.map(val=>{delete val.key; return Object.values(val)}));
    // 1.创建websheet excel表
    let ws = XLSX.utils.json_to_sheet(origin, { skipHeader: true });
    // 2.创建webbook  excel文件
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws);
    // 3. 写到本地
    XLSX.writeFile(wb, "导出表格.xlsx");
  }

  //打印数据
  function showData() {
    console.log("origin:", origin);
    console.log("columns:", columns);
    console.log(columns.map(val=>val.title));
    console.log("dataSource:", dataSource);
    console.log(dataSource.map(val=>{delete val.key; return Object.values(val)}));
    console.log([columns.map(val=>val.title)].concat(dataSource.map(val=>{delete val.key; return Object.values(val)})))
   
  }

  return (
    <div>
      {/* 上传excel */}
      <Upload onChange={uploadExcel} accept=".xlsx,.xls,.csv">
        <Button>
          <Icon type="upload" />
          Click to Upload
        </Button>
      </Upload>
      {/* 打印数据 */}
      <Button onClick={showData}>打印数据</Button>
      {/* 导出excel */}
      <Button onClick={exportExcel}>导出excel</Button>
      {/* 列表 */}
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};
