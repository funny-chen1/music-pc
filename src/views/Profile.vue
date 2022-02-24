<template>
  <div>
    <Menu></Menu>
    <div class="container profile-main">
      <div class="header">
        <h3>个人设置</h3>
      </div>
      <Form :model="formItem"
            :label-width="80"
            style="width: 400px;">
        <Form-item label="昵称">
          <Input v-model="formItem.nickname"
                 placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="介绍">
          <Input v-model="formItem.signature"
                 type="textarea"
                 :autosize="{minRows: 3,maxRows: 10}"
                 placeholder="请输入..."></Input>
        </Form-item>
        <Form-item label="生日">
          <Date-picker type="date"
                       placeholder="选择日期"
                       v-model="formItem.birthday"></Date-picker>
        </Form-item>
        <Form-item label="性别">
          <Radio-group v-model="formItem.gender">
            <Radio label="1">男</Radio>
            <Radio label="2">女</Radio>
          </Radio-group>
        </Form-item>
        <Form-item>
          <Button type="primary"
                  @click="submit">提交</Button>
          <Button type="primary"
                  style="margin-left: 8px"
                  @click="reset('formItem')">取消</Button>
        </Form-item>
      </Form>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu'
export default {
  components: {
    Menu
  },
  inject: ['reload'],
  data() {
    return {
      formItem: {
        nickname: '',
        gender: '',
        birthday: '',
        signature: '',
        province: '',
        city: '',
        cookie: ''
      },
      userInfo: {}
    }
  },
  methods: {
    reset(name) {
    },
    async submit() {
      console.log(this.formItem);
      if (this.userInfo) {
        this.formItem.cookie = this.userInfo.cookie;
        try {
          const res = await this.$axios.post(this.api.update, this.formItem);
          if (res.data.code == 200) {
            await this.$axios.post(this.api.refreshLogin, {cookie: this.userInfo.cookie});
            this.$Message.success('更新成功');
            this.reload();
          } else {
              this.$Message.error(res.data.message);
          }
        } catch(err) {
            this.$Message.error('更新失败');
        }
      }
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.userInfo);
    if (this.userInfo) {
      this.formItem.nickname = this.userInfo.profile.nickname;
      this.formItem.gender = this.userInfo.profile.gender;
      this.formItem.signature = this.userInfo.profile.signature;
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-main {
  background-color: #fff;
  border: 1px solid #ccc;
  min-height: 800px;
  width: 1080px;
  padding: 80px 200px;
  text-align: left;
  .header {
    border-bottom: 2px solid #999;
    margin-bottom: 30px;
  }
}
</style>