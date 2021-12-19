/*
 * @Copyrights: 2021 @TheJunhan
 * @Date: 2021-10-27 14:40:39
 * @LastEditor: TheJunhan
 * @LastEditTime: 2021-12-05 16:30:12
 */
/**
 * 功能梳理：主页面（不用登录），登录、注册页面，上方刘海栏，用户是否登录的状态维护，
 * 数据库界面，多项查询（根据表来），上传界面，（专门的）多种上传检查服务，
 * 静态变量（包括表单属性，URL等）服务，个人主页界面，
 * 管理员界面，emm我想的是在数据库界面最边上给他加一个删除按钮，然后在个人主页上搞一个批量上传
 */
import Main from "./main"
import 'antd/dist/antd.css'
export default function Home() {
  return (
    <div>
      <Main/>
    </div>
  )
}
