const db = require('./database')
const bcrypt = require('bcryptjs')

const dateObj = new Date();
const month = dateObj.getUTCMonth() + 1; //months from 1-12
const day = dateObj.getUTCDate();
const year = dateObj.getUTCFullYear();
const hours = dateObj.getHours();
const minutes = dateObj.getMinutes();
const seconds = dateObj.getSeconds();

const date = year + "-" + month + "-" + day;
const datetime = date + " " + hours + ":" + minutes + ":" + seconds

const createUserBranch = async (req, res) => {
    const {
        user_name,
        user_email,
        user_password,
        user_phone_number,
        user_first_name,
        user_last_name,
        user_referal_code,
        user_profile_url,
        user_radius_point,
    } = req.body

    //validasi form
    const { isError, errorData } = await validationUser(req, res)

    if (isError) {
        res.status(400)
            .json({
                status: 400,
                message: 'Cek kembali form Anda.',
                errorData
            });
    } else {
        // hash password
        const hash_password = await generateBcrypt(user_password)

        let sql = `
            INSERT INTO 
            public.user (
                user_name, 
                user_email, 
                user_password, 
                user_phone_number, 
                user_first_name, 
                user_last_name, 
                user_referal_code, 
                user_profile_url, 
                user_role,
                user_radius_point,
                user_join_date,
                user_status,
                user_created_at
            )VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING user_id
        `

        const results = await db.query(sql, [
            user_name,
            user_email,
            hash_password,
            user_phone_number,
            user_first_name,
            user_last_name,
            user_referal_code,
            user_profile_url,
            "admin_branch",
            user_radius_point,
            date,
            "active",
            datetime
        ])

        //Get data user yang telah diinput
        sql = `
            SELECT
            user_id,
            user_name,
            user_email,
            user_phone_number,
            user_first_name,
            user_last_name,
            user_referal_code,
            user_profile_url,
            user_role,
            user_radius_point,
            user_join_date,
            user_status,
            user_created_at,
            user_updated_at 
            FROM public.user 
            WHERE user_id = $1
        `

        const resultGetOne = await db.query(sql, [results.rows[0].user_id])

        resultGetOne.rows[0]['user_phone_number'] = resultGetOne.rows[0]['user_phone_number'].trim()

        res.status(201)
            .json({
                status: 201,
                message: 'Berhasil tambah data user branch.',
                errorData: {},
                data: resultGetOne.rows[0]
            })
    }
}

const listUserBranch = async (req, res) => {
    sql = `
        SELECT
        user_id,
        user_name,
        user_email,
        user_phone_number,
        user_first_name,
        user_last_name,
        user_referal_code,
        user_profile_url,
        user_role,
        user_radius_point,
        user_join_date,
        user_status,
        user_created_at,
        user_updated_at 
        FROM public.user 
        WHERE user_role = $1
    `

    const results = await db.query(sql, ['admin_branch'])

    res.json({
        status: 200,
        message: 'Berhasil mendapatkan data user branch.',
        errorData: {},
        data: {
            results: results.rows
        }
    })
}

const createUserSupervisor = async (req, res) => {
    const {
        user_name,
        user_email,
        user_password,
        user_phone_number,
        user_first_name,
        user_last_name,
        user_referal_code,
        user_profile_url,
        user_radius_point,
    } = req.body

    //validasi form
    const { isError, errorData } = await validationUser(req, res)

    if (isError) {
        res.status(400)
            .json({
                status: 400,
                message: 'Cek kembali form Anda.',
                errorData
            });
    } else {
        // hash password
        const hash_password = await generateBcrypt(user_password)

        let sql = `
            INSERT INTO 
            public.user (
                user_name, 
                user_email, 
                user_password, 
                user_phone_number, 
                user_first_name, 
                user_last_name, 
                user_referal_code, 
                user_profile_url, 
                user_role,
                user_radius_point,
                user_join_date,
                user_status,
                user_created_at
            )VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING user_id
        `

        const results = await db.query(sql, [
            user_name,
            user_email,
            hash_password,
            user_phone_number,
            user_first_name,
            user_last_name,
            user_referal_code,
            user_profile_url,
            "supervisor",
            user_radius_point,
            date,
            "active",
            datetime
        ])

        //Get data user yang telah diinput
        sql = `
            SELECT
            user_id,
            user_name,
            user_email,
            user_phone_number,
            user_first_name,
            user_last_name,
            user_referal_code,
            user_profile_url,
            user_role,
            user_radius_point,
            user_join_date,
            user_status,
            user_created_at,
            user_updated_at 
            FROM public.user 
            WHERE user_id = $1
        `

        const resultGetOne = await db.query(sql, [results.rows[0].user_id])

        resultGetOne.rows[0]['user_phone_number'] = resultGetOne.rows[0]['user_phone_number'].trim()

        res.status(201)
            .json({
                status: 201,
                message: 'Berhasil tambah data supervisor.',
                errorData: {},
                data: resultGetOne.rows[0]
            })
    }
}

const listUserSupervisor = async (req, res) => {
    sql = `
        SELECT
        user_id,
        user_name,
        user_email,
        user_phone_number,
        user_first_name,
        user_last_name,
        user_referal_code,
        user_profile_url,
        user_role,
        user_radius_point,
        user_join_date,
        user_status,
        user_created_at,
        user_updated_at 
        FROM public.user 
        WHERE user_role = $1
    `

    const results = await db.query(sql, ['supervisor'])

    res.json({
        status: 200,
        message: 'Berhasil mendapatkan data supervisor.',
        errorData: {},
        data: {
            results: results.rows
        }
    })
}

const changeUserRole = async (req, res) => {
    const user_id = parseInt(req.params.user_id)
    const { user_role } = req.body

    const defaultRole = ["admin_branch", "supervisor"]

    if (!defaultRole.includes(user_role)) {
        res.status(400)
            .json({
                status: 400,
                message: 'Cek kembali form Anda.',
                errorData: 'User role tidak valid.'
            });
    } else {
        let sql = `UPDATE public.user SET user_role = $1, user_updated_at = $2 WHERE user_id = $3`

        const results = await db.query(sql, [
            user_role,
            datetime,
            user_id
        ])

        //Get data user yang telah diinput
        sql = `
            SELECT
            user_id,
            user_name,
            user_email,
            user_phone_number,
            user_first_name,
            user_last_name,
            user_referal_code,
            user_profile_url,
            user_role,
            user_radius_point,
            user_join_date,
            user_status,
            user_created_at,
            user_updated_at 
            FROM public.user 
            WHERE user_id = $1
        `

        const resultGetOne = await db.query(sql, [user_id])

        if (resultGetOne.rows.length > 0) {
            resultGetOne.rows[0]['user_phone_number'] = resultGetOne.rows[0]['user_phone_number'].trim()
        }

        res.status(201)
            .json({
                status: 201,
                message: resultGetOne.rows.length > 0 ? 'Berhasil ubah data.' : 'Data tidak ditemukan.',
                errorData: {},
                data: resultGetOne.rows.length > 0 ? resultGetOne.rows[0] : {}
            })
    }
}

const validationUser = async (req, res) => {
    const {
        user_name,
        user_email,
        user_password,
        user_phone_number,
        user_first_name,
        user_last_name,
        user_referal_code,
        user_profile_url,
        user_radius_point,
    } = req.body

    let isError = false
    let errorData = {}

    //validate username
    if (user_name.length <= 0) {
        isError = true
        errorData.user_name = "Username harus diisi."
    } else {
        const results = await db.query('SELECT COUNT(user_id) AS total FROM public.user WHERE user_name = $1', [user_name])
        if (results.rows[0].total > 0) {
            isError = true
            errorData.user_name = "Username sudah ada."
        }
    }

    //validate email
    if (user_email.length <= 0) {
        isError = true
        errorData.user_email = "Email harus diisi."
    } else {
        if (!user_email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            isError = true
            errorData.user_email = "Email tidak valid."
        } else {
            const results = await db.query('SELECT COUNT(user_id) AS total FROM public.user WHERE user_email = $1', [user_email])
            if (results.rows[0].total > 0) {
                isError = true
                errorData.user_email = "Email sudah ada."
            }
        }
    }

    //validate phone number
    if (user_phone_number.length <= 0) {
        isError = true
        errorData.user_phone_number = "No. telepon harus diisi."
    } else {
        const results = await db.query('SELECT COUNT(user_id) AS total FROM public.user WHERE user_phone_number = $1', [user_phone_number])

        if (results.rows[0].total > 0) {
            isError = true
            errorData.user_phone_number = "No. telepon sudah ada."
        }
    }

    //validate first name
    if (user_first_name.length <= 0) {
        isError = true
        errorData.user_first_name = "Nama depan harus diisi."
    }

    //validate last name
    if (user_last_name.length <= 0) {
        isError = true
        errorData.user_last_name = "Nama belakang harus diisi."
    }

    return { isError, errorData }
}

const generateBcrypt = async (data) => new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
        if (err) {
            throw error
        }
        bcrypt.hash(data, salt, (err, hash) => {
            if (err) {
                throw error
            }
            resolve(hash)
        })
    })
})

module.exports = {
    //admin branch
    createUserBranch,
    listUserBranch,

    //supervisor
    createUserSupervisor,
    listUserSupervisor,

    changeUserRole
}