<template>
<layout>
    <Row>
        <Col :xs="{ span: 24, offset: 0 }" :sm="{ span: 16, offset: 4 }" :md="{ span: 16, offset: 4 }" :lg="{ span: 12, offset: 6 }">
            <Card>
                <p slot="title">User Informasi</p>
                <Form :model="user" label-position="left" :label-width="150">
                    <Form-item label="Nama">
                        <Input v-model="user.name" placeholder="Nama" :disabled="true"></Input>
                    </Form-item>
                    <Form-item label="ID User">
                        <Input v-model="user.nis" placeholder="Id User" :disabled="true"></Input>
                    </Form-item>
                    <Form-item label="Kelas">
                        <Input v-model="user.kelas" placeholder="Kelas" :disabled="true"></Input>
                    </Form-item>
                    <Form-item label="Program Keahlian">
                        <Input v-model="user.name" placeholder="Program Keahlian" :disabled="true"></Input>
                    </Form-item>
                </Form>
            </Card>
        </Col>
    </Row>
</layout>
</template>

<script>
import axios from 'axios';
import Layout from '../layouts/default';

export default {
    name: 'dashboard',
    components: { Layout },
    data () {
        return {
            user: {
                name: '',
                nis: '',
                kelas: '',
                program: ''
            }
        };
    },
    mounted () {

        this.fetchInfo();

    },
    methods: {
        fetchInfo () {
            axios.get('api/user').then( (res) => {
                this.user = res.data.data
            })
        },
        formItem () {

        }
    }
};
</script>

<style lang="css" scoped>
</style>