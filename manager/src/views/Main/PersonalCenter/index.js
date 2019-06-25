import { useState, useEffect } from "react";
import {
  Layout,
  Button,
  Typography
} from "antd";
import { connect } from "dva";
import PageTitle from "@/components/Title";
import axios from "axios";
const { Content } = Layout;
const { Title } = Typography;
function PersonalCenter(props) {
  const {
    updateAvatar,
    userInfo: { avatar }
  } = props;
  const [src, updateSrc] = useState("");
  const [canvas, updateCanvas] = useState("");
  const [ctx, updateCtx] = useState("");
  console.log(canvas)
	useEffect(()=>{
		if(!canvas.getContext)return;
		updateCtx(canvas.getContext("2d"))
	},[canvas])
  useEffect(() => {
    updateSrc(avatar);
  }, [avatar]);
  // 文件上传,formData方式,formData对象,键为文件名,值为文件
  function fileChange(e) {
    let files = e.target.files;
    let form = new FormData();
    for (let i = 0, len = files.length; i < len; i++) {
      form.append(files[i].name, files[i]);
    }
    axios({
      method: "post",
      url: "http://123.206.55.50:11000/upload",
      data: form
    })
      .then(body => {
        console.log("body...", body);
        console.log(body.data.data[0].path);
        updateSrc(body.data.data[0].path);
      })
      .catch(e => {
        console.log("e...", e);
      });
  }
  // base64方式,
  function fileChange64(e) {
    let files = e.target.files;
    console.log("files...", files);
    let data = new FileReader();
    console.log(data);
    data.onload = function(e) {
      console.log(e);
      console.log(this.result);
      axios({
        method: "post",
        url: "http://123.206.55.50:11000/upload_base64",
        data: { base64: this.result }
      })
        .then(body => {
          console.log("body...", body);
          console.log(body.data.data.path);
          updateSrc(body.data.data.path);
        })
        .catch(e => {
          console.log("e...", e);
        });
    };
    data.readAsDataURL(files[0]);
  }
  function fileChangebg(e) {
    let files = e.target.files;
		let data = new FileReader();
    data.onload = function(e) {
			console.log(this.result);
			var img=new Image();
			img.src=this.result;
			img.onload=()=>{
				ctx.drawImage(img, 0, 0, 400, 600);
			}
		}
    data.readAsDataURL(files[0]);
	}
  function fileChangeHead(e) {
		let files = e.target.files;
		let data = new FileReader();
    data.onload = function(e) {
			console.log(this.result);
			var img=new Image();
			img.src=this.result;
			img.onload=()=>{
				ctx.drawImage(img, 200, 100, 100, 100);
			}
		}
    data.readAsDataURL(files[0]);
	}
  function uploadImg() {
    if (src === avatar) return;
    updateAvatar(src);
  }

  return (
    <Layout>
      <PageTitle>个人中心</PageTitle>
      <Content className="content">
        <Content>
          <Title level={2}>更换头像</Title>
          <div>
            <input type="file" onChange={fileChange} />
            <input type="file" onChange={fileChange64} />
          </div>
          <div style={{ padding: "20px" }}>
            <img
              src={src}
              alt="头像"
              style={{ width: "120px", height: "120px" }}
            />
          </div>
          <div>
            <Button disabled={src === avatar} onClick={uploadImg}>
              上传
            </Button>
          </div>
        </Content>
        <Content>
          <Title level={2}>图片合成</Title>
          背景:<input type="file" onChange={fileChangebg} />
          头像:<input type="file" onChange={fileChangeHead} />
          <canvas ref={updateCanvas} width="400" height="600" />
        </Content>
      </Content>
    </Layout>
  );
}
const mapState = state => state.user;
const mapDispatch = dispatch => ({
  updateAvatar(payload) {
    dispatch({
      type: "user/updateAvatar",
      payload
    });
  }
});
export default connect(
  mapState,
  mapDispatch
)(PersonalCenter);
