<template>
<layout>
    <Row>
        <Col :xs="{ span: 24, offset: 0 }" :sm="{ span: 16, offset: 4 }" :md="{ span: 12, offset: 6 }" :lg="{ span: 8, offset: 8 }">
            <Card :bordered="false" class="login">
                <p slot="title">Login</p>
                <Form :model="auth" :label-width="120" ref="loginForm" :rules="loginValidate" label-position="left">
                    <Form-item label="Username" prop="username">
                        <Input type="text" v-model="auth.username" placeholder="Username"></Input>
                    </Form-item>
                    <Form-item label="Password" prop="password">
                        <Input type="password" v-model="auth.password" placeholder="Password"></Input>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" :loading="loading" @click="postLogin">
                            <span v-if="!loading">Login</span>
                            <span v-else>Loading...</span>
                        </Button>
                    </Form-item>
                </Form>
            </Card>
        </Col>
    </Row>
</layout>
</template>

<script>
import axios from 'axios'
import Layout from '../layouts/default'

export default {
    name: 'login',
    components: { Layout },
    data () {
        return {
            loading: false,
            auth: {
                username: '',
                password: ''
            },
            loginValidate : {
                username: [
                    { required: true, message: 'Isian username tidak boleh kosong', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Isian password tidak boleh kosong', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        postLogin () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    axios.post('api/login', this.auth)
                        .then( (res) => {
                            this.$store.commit('SET_USER', res.data.data);
                            this.$store.commit('SET_TOKEN', res.data.meta.token);
                            // console.log(this.$store.state);
                            this.$router.push('/dashboard');
                        })
                        .catch( (error) => {
                            this.$Message.error('Invalid Credentials');
                            this.loading = false;
                        });
                } else {
                    this.$Message.error('Ops.. Periksa kembali isian anda');
                }
            })
        }
    }
};
</script>

<style lang="css" scoped>
.ivu-card.login {
    margin-top: 40px;
}
</style>