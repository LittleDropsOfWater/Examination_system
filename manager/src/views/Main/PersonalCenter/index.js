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
  const [width] = useState(400);
  const [height] = useState(400);
  const [isupload, updateupload] = useState(false);
  useEffect(() => {
    if (!canvas.getContext) return;
    updateCtx(canvas.getContext("2d"));
  }, [canvas]);

  useEffect(() => {
    updateSrc(avatar);
  }, [avatar]);
  // 文件上传,formData方式,formData对象,键为文件名,值为文件
  function fileChange(e) {
    updateupload(true);

    console.log("e...", e);
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
        updateupload(false);
      })
      .catch(e => {
        console.log("e...", e);
      });
  }
  // base64方式,
  function fileChange64(e) {
    updateupload(true);

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
          updateupload(false);
        })
        .catch(e => {
          console.log("e...", e);
        });
    };
    data.readAsDataURL(files[0]);
  }
  // function fileChangebg(e) {
  //   let filesbg = e.target.files;
  // 	let databg = new FileReader();
  //   databg.onload = function(e) {
  // 		console.log(this.result);
  // 		var img=new Image();
  // 		img.src=this.result;
  // 		img.onload=()=>{
  // 			ctx.drawImage(img, 0, 0, 400, 600);
  // 		}
  // 	}
  //   databg.readAsDataURL(filesbg[0]);
  // }
  var bgSrc =
    "https://drscdn.500px.org/photo/242916761/q%3D80_m%3D1000/v2?webp=true&sig=f3274a484936efcdea5848326ad1e369fbd6ea57275ed7f239d468f8227669f3";
  var svg = `<svg>
  <foreignObject width="100%" height="100%" >
  <img src='https://upload-images.jianshu.io/upload_images/2179333-a8b12e03cacd6e46.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp' />
  </foreignObject>
  </svg>`;
  var b64 = "data:image/svg+xml;base64," + window.btoa(svg);
  var pimg = new Image();
  pimg.onload = function() {
    ctx && ctx.drawImage(pimg, 0, 0);
  };
  pimg.src = b64;
  function fileChangeHead(e) {
    updateupload(true);
    console.log(e.target.files);
    let files = e.target.files;
    var bg = new Image();

    //将网络图片传到第三方平台,转为base64
    axios({
      method: "post",
      url: "http://123.206.55.50:11000/tobase64",
      data: { url: bgSrc }
    })
      .then(body => {
        console.log("body...", body.data.data);
        bg.src = body.data.data.base64;
      })
      .catch(e => {
        console.log("e..", e);
      });
    bg.onload = () => {
      ctx.drawImage(bg, 0, 0, width, height);
      let data = new FileReader();
      data.onload = function(e) {
        console.log(this.result);
        var head = new Image();
        head.src = this.result;
        head.onload = () => {
          let w = 150,
            h = 150,
            x = (width - w) / 2,
            y = (height - h) / 2,
            r = 20,
            d = 10;
          ctx.save();
          if (w < 2 * r) r = w / 2;
          if (h < 2 * r) r = h / 2;
          ctx.beginPath();
          ctx.moveTo(x + r, y);
          ctx.arcTo(x + w, y, x + w, y + h, r);
          ctx.arcTo(x + w, y + h, x, y + h, r);
          ctx.arcTo(x, y + h, x, y, r);
          ctx.arcTo(x, y, x + w, y, r);
          ctx.closePath();
          ctx.fillStyle = "#fff";
          ctx.fill();
          ctx.restore();
          x = x + d;
          y = y + d;
          w = w - r;
          h = h - r;
          ctx.beginPath();
          ctx.moveTo(x + r, y);
          ctx.arcTo(x + w, y, x + w, y + h, r);
          ctx.arcTo(x + w, y + h, x, y + h, r);
          ctx.arcTo(x, y + h, x, y, r);
          ctx.arcTo(x, y, x + w, y, r);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(head, x, y, w, h);
          axios({
            method: "post",
            url: "http://123.206.55.50:11000/upload_base64",
            data: { base64: canvas.toDataURL() }
          })
            .then(body => {
              console.log("body...", body);
              console.log(body.data.data.path);
              updateSrc(body.data.data.path);
              updateupload(false);
            })
            .catch(e => {
              console.log("e...", e);
            });
        };
      };
      data.readAsDataURL(files[0]);
    };
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
            <p>
              formData方式:
              <input type="file" onChange={fileChange} disabled={isupload} />
            </p>
            <p>
              base64方式:
              <input type="file" onChange={fileChange64} disabled={isupload} />
            </p>
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
          头像:
          <input type="file" onChange={fileChangeHead} disabled={isupload} />
          <canvas ref={updateCanvas} width={width} height={height} />
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
