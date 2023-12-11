const express = require("express")
var cors = require('cors')
const { Pool } = require('pg')
const multer = require("multer")
const path = require("path")
const session = require('express-session')
const flash = require('connect-flash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Console } = require("console")
const { geteuid } = require("process")
const { getDefaultHighWaterMark } = require("stream")
const { get } = require("http")
require('dotenv').config()
const PORT = process.env.PORT || 8081
const pool = new Pool({
    connectionString: "postgres://itlciaeb:1-WPNlUxLrrety67AONnYGWqLBesWR1s@kesavan.db.elephantsql.com/itlciaeb"
})
const app = express()
app.use(cors())
// configurar leitura de objetos json no projeto
app.use(express.json())

const dataHora = new Date();
dataHora.setHours(dataHora.getHours() - 3);

app.get('/', (req, res) => {

    res.status(200).json({ msg: "bem- vindo! status:" + dataHora + "| -v 1.0" })
})

//teste rota protegida por token
app.get('/teste/login', checkToken, async (req, res) => {
    res.status(200).json({ test: 'acesso liberado' })
})

const secret = "WARLEYGONCALVESDOSREIS"

// criando o middleware para confimar o tokem de autenticação do usuario
function checkToken(req, res, next) {
   
    // crio a constante recebendo o parametro authorization do header da solicitação
    const autHeader = req.headers['authorization']
    //extraio o token separando o array pelo "" e pegando a segunda parte
    const tokenRecebido = autHeader && autHeader.split(" ")[1]

    //verificando se há tokem recebido
    if (!tokenRecebido) {
        res.status(401).json({ msg: "necessario fazer login" })
    }

    try {
        //testando se o tokem confere

        const decoded = jwt.verify(tokenRecebido, secret);
        next()
        
    } catch (error) {
        //res.status(422).json({ msg: "tokem invalido", error })
    }
}

app.post('/authentication/signin', async (req, res) => {
    const { email, password } = req.body
    try {
        if (email && password) {
            //requisição no banco
            const getUser = await pool.query('SELECT * FROM users where email=($1)', [email])
            //verificar se a senha digitada confere com a do banco
            const confirmPassaWord = await bcrypt.compare(password, getUser.rows[0].senha)
            //se nao conferir envio msg de erro

            if (confirmPassaWord) {
                const getProject = await pool.query('SELECT * FROM projects where id=($1)', [getUser.rows[0].project_id])

                const token = jwt.sign(
                    {
                        id: getUser.rows[0].id,
                        name: getUser.rows[0].name,
                        tipo: getUser.rows[0].type,
                        Project: getUser.rows[0].project_id,
                        ProjectName: getProject.rows[0].name,
                        plan: getProject.rows[0].plan,
                    },
                    secret,
                )
                //teste particular para enviar mais de q parametro
                res.status(200).json({
                    token: token,
                    id: getUser.rows[0].id,
                    nome: getUser.rows[0].nome,
                    cliente: getUser.rows[0].cliente_id,
                    tipo: getUser.rows[0].tipo,
                    setor: getUser.rows[0].setor,
                    veiculoId: getVehicle.rows.length > 0 ? getVehicle.rows[0].id : 'null',
                    veiculoDesc: getVehicle.rows.length > 0 ? getVehicle.rows[0].frota : 'null',
                })
            } else {
                res.status(422).json({ msg_alert: "Senha e usuários não conferem" })
            }
        } else {
            res.status(422).json({ msg_alert: "Preencha todos os campos" })
        }
    } catch {
        res.status(400).json({ msg_alert: "usuario não encontrado" })
    }
})

//Projeto ________________________________________________________________________________________________
app.post('/project/create', async (req, res) => {
    const { nameUser, email, nameProject } = req.body;

    try {
        // const salt = await bcrypt.genSalt(12)
        //const passwordBcrypt = await bcrypt.hash(password, salt)
        const newProject = await pool.query('INSERT INTO projects (name) VALUES ($1) RETURNING *', [nameProject])
        const newUser = await pool.query('INSERT INTO users (name, email, type,project_id) VALUES ($1,$2,$3,$4) RETURNING *', [nameUser, email, 'MANAGER', newProject.rows[0].id])
        const token = jwt.sign(
            {
                userid: newUser.rows[0].id,
                project_id: newProject.rows[0].id,
            },
            secret,
        )
        //ENCAMINHANDO OS DADOS NECESSÁRIOS AO FRONT
        return res.status(200).json({
            token: token,
            userId: newUser.rows[0].id,
            userName: newUser.rows[0].name,
            userType: newUser.rows[0].type,
            userEmail: newUser.rows[0].email,
            userImage: newUser.rows[0].image,
            projectId: newProject.rows[0].id,
            projectName: newProject.rows[0].name,
            projectPlan: newProject.rows[0].plan,
            msg: "Seu novo projeto foi criado com sucesso!",
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/project/read/:id', checkToken, async (req, res) => {
    const id = req.params.id
    try {
        const getProjet = await pool.query("SELECT * from projects where id=($1)", [id])
        res.status(200).json({ registros: getProjet.rows[0] })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.patch('/project/update', checkToken, async (req, res) => {
    const { project_id, email, name, phone, cpf_cnpj, logo } = req.body;
    try {
        const updateProject = await pool.query('UPDATE projects SET name=($1),cpf_cnpj=($2),phone=($3),logo=($4) where id=($5) RETURNING *', [name, cpf_cnpj, phone, logo, project_id])
        res.status(200).json({ msg: "Dados alterado com sucesso!" })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.post('/project/merchant/create', checkToken, async (req, res) => {
    const { nameMerchant, emailMerchant, phoneMerchant, project_id } = req.body;
    try {
        nameMerchant.map(async (linha, key) => {
            let newMerchant = await pool.query('INSERT INTO merchants (name,email,phone,project_id) VALUES ($1,$2,$3,$4) RETURNING *', [linha, emailMerchant[key], phoneMerchant[key], project_id])

        })
        const getMerchants = await pool.query("SELECT * from merchants where project_id=($1) AND status!='0' ORDER BY id ASC", [project_id])
        res.status(200).send(getMerchants.rows)
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/project/merchants/:id', checkToken, async (req, res) => {
    const id = req.params.id
    try {
        const getMerchants = await pool.query("SELECT * from merchants where project_id=($1) AND status!='0'", [id])

        res.status(200).send(getMerchants.rows)
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/project/merchant/read/:id', checkToken, async (req, res) => {
    const { id } = req.body;
    try {
        const getMerchant = await pool.query("SELECT * from merchant where id=($1)", [id])
        res.status(200).send(getMerchant.rows)
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.patch('/project/merchant/delete/:id', checkToken, async (req, res) => {
    const id = req.params.id;
    console.log('aqui remove')
    try {
        const updateMerchants = await pool.query('UPDATE merchants SET status=($1) where id=($2) RETURNING *', [0, id])

        res.status(200).json({ msg: "Fornecedor removido!" })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

//equipment________________________________________________________________________________________________
app.get('/equipment/epis', checkToken, async (req, res) => {
    try {
        const getEpis = await pool.query("SELECT * from epis")
        res.status(200).send(getEpis.rows)
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/equipments', checkToken, async (req, res) => {
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const decoded = jwt.verify(tokenRecebido, secret);
    try {

        const getEquipments = await pool.query("SELECT equipments.approval_certificate,equipments.price,equipments.classification_size_id,equipments.current_balance,equipments.id,equipments.ideal_balance,equipments.price,equipments.validity, to_char(equipments.validity_certificate_approval, 'DD/MM/YYYY') as validity_certificate_approval, CASE WHEN equipments.current_balance >= equipments.ideal_balance THEN 'ALTO' WHEN equipments.current_balance < equipments.ideal_balance THEN 'BAIXO' END status_balance,classification_sizes.size,epis.type from equipments JOIN epis ON equipments.epi_id=epis.id JOIN classification_sizes ON equipments.classification_size_id=classification_sizes.id where equipments.project_id=($1) AND equipments.status=($2) ORDER BY equipments.id DESC", [decoded.project_id, 1])

        res.status(200).send(getEquipments.rows)
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/equipment/read/:id', checkToken, async (req, res) => {
    const { id } = req.params;

    try {

        const getEquipment = await pool.query("SELECT equipments.approval_certificate,equipments.epi_id, equipments.classification_size_id,equipments.current_balance,equipments.id,equipments.ideal_balance,equipments.price,equipments.validity, to_char(equipments.validity_certificate_approval, 'YYYY/MM/DD') as validity_certificate_approval  FROM equipments where equipments.id=($1)", [id])
        console.log(getEquipment.rows)
        if (getEquipment.rowCount < 1) {
            return res.status(400).json({ msg: "Houve um erro na solicitação: " })
        } else {
            res.status(200).send(getEquipment.rows[0])
        }

    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/equipment/classification_sizes/:epi_id', checkToken, async (req, res) => {
    const { epi_id } = req.params;
    try {
        const getEpis = await pool.query("SELECT * from epis where id=($1)", [epi_id])
        const getClassification = await pool.query("SELECT * from classification_sizes where classification_size=($1)", [getEpis.rows[0].classification_size])

        res.status(200).send(getClassification.rows)
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.post('/equipment/create', checkToken, async (req, res) => {
    const { epi_id, approval_certificate, classification_size_id, validity_certificate_approval, validity, ideal_balance, current_balance, price } = req.body;
    try {
        const autHeader = req.headers['authorization']
        const tokenRecebido = autHeader && autHeader.split(" ")[1]
        const decoded = jwt.verify(tokenRecebido, secret);
        if (new Date(validity_certificate_approval) < new Date()) {
            return res.status(400).json({ msg: "A data de Validade do CA precisa ser maior do que hoje" })
        }
        const getEquipment = await pool.query("SELECT classification_size_id,approval_certificate, validity_certificate_approval,project_id from equipments where  classification_size_id=($1) AND approval_certificate=($2) AND  validity_certificate_approval=($3) AND project_id=($4) AND status=($5)", [classification_size_id, approval_certificate, validity_certificate_approval, decoded.project_id, 1])
        if (getEquipment.rowCount > 0) {
            return res.status(400).json({ msg: "Parece que você já tem esse equipameto cadastro em seu projeto!" })
        }
        const newEquipment = await pool.query('INSERT INTO equipments (epi_id,approval_certificate, classification_size_id, validity_certificate_approval, validity, ideal_balance, current_balance, price,project_id ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *', [epi_id, approval_certificate, classification_size_id, validity_certificate_approval, validity, ideal_balance, current_balance, price, decoded.project_id])
       console.log(newEquipment.rows[0].id)
        if (newEquipment.rowCount > 0) { 
            const newRegistro = await pool.query("SELECT equipments.approval_certificate,equipments.classification_size_id,equipments.current_balance,equipments.id,equipments.ideal_balance,equipments.price,equipments.validity, to_char(equipments.validity_certificate_approval, 'DD/MM/YYYY') as validity_certificate_approval, classification_sizes.size,CASE WHEN equipments.current_balance >= equipments.ideal_balance THEN 'ALTO' WHEN equipments.current_balance < equipments.ideal_balance THEN 'BAIXO' END status_balance,epis.type from equipments JOIN epis ON equipments.epi_id=epis.id JOIN classification_sizes ON equipments.classification_size_id=classification_sizes.id where equipments.project_id=($1) AND equipments.id=($2)",[decoded.project_id, newEquipment.rows[0].id])
            res.status(200).send(newRegistro.rows[0])
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.post('/equipment/buy/create', checkToken, async (req, res) => {     
    const { merchant_id, list_equipment_id, qty, current_price } = req.body;
    try {
        const autHeader = req.headers['authorization']
        const tokenRecebido = autHeader && autHeader.split(" ")[1]
        const decoded = jwt.verify(tokenRecebido, secret);
        
        list_equipment_id.map(async (equipment, key) => {
            const updateEquipment = await pool.query('UPDATE equipments SET price=($1), current_balance= current_balance+($2) where id=($3) and project_id=($4) RETURNING *', [current_price[key], qty[key], equipment, decoded.project_id])
            const newBuyEquipment = await pool.query('INSERT INTO buy_histories ( merchant_id, equipment_id,current_price, qty,project_id) VALUES ($1,$2,$3,$4,$5) RETURNING *', [merchant_id ,equipment, current_price[key], qty[key], decoded.project_id])
        })
        return res.status(200).json({ msg: "Registrado" })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/equipment/history/:equipment_id', checkToken, async (req, res) => {
    const { equipment_id } = req.params;
    try {
        const getHistoryBuy = await pool.query("SELECT  buy_histories.qty, to_char(buy_histories.created_at, 'DD/MM/YYYY') as date, merchants.name as merchantname from buy_histories JOIN merchants ON buy_histories.merchant_id=merchants.id where equipment_id=($1) ORDER BY buy_histories.id DESC  LIMIT 10", [equipment_id])
      
        const getHistoryProvided = await pool.query("SELECT  provided_histories.qty, to_char(provided_histories.created_at, 'DD/MM/YYYY') as date, employees.name as employeename from provided_histories JOIN employees ON provided_histories.employee_id=employees.id where equipment_id=($1) ORDER BY provided_histories.id DESC  LIMIT 10", [equipment_id])

        res.status(200).json({ listBuy: getHistoryBuy.rows,listProvided:getHistoryProvided.rows })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/equipment/cart', checkToken, async (req, res) => {
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const decoded = jwt.verify(tokenRecebido, secret);
    console.log(decoded.project_id)
    try {

        const getCart = await pool.query("SELECT equipments.id,(equipments.ideal_balance - equipments.current_balance) as qty, epis.type,classification_sizes.size, equipments.epi_id FROM equipments JOIN epis ON equipments.epi_id=epis.id JOIN classification_sizes ON equipments.classification_size_id=classification_sizes.id where equipments.ideal_balance > equipments.current_balance and equipments.project_id=($1) and equipments.status=($2)",[decoded.project_id,'1'])
      
        res.status(200).send(getCart.rows)
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.patch('/equipment/update', checkToken, async (req, res) => {
    const { id, epi_id, approval_certificate, classification_size_id, validity_certificate_approval, validity, ideal_balance, current_balance, price } = req.body;
    console.log(req.body)
    try {
        const autHeader = req.headers['authorization']
        const tokenRecebido = autHeader && autHeader.split(" ")[1]
        const decoded = jwt.verify(tokenRecebido, secret);
        const updateEquipment = await pool.query('UPDATE equipments SET approval_certificate=($1), classification_size_id=($2), validity_certificate_approval=($3), validity=($4), ideal_balance=($5), current_balance=($6), price=($7) where id=($8) and project_id=($9) RETURNING *', [approval_certificate, classification_size_id, validity_certificate_approval, validity, ideal_balance, current_balance, price, id, decoded.project_id])
        //data de validação nao pode ser menor que hoje
        //se prazo de validade for menor que o atual, alguns fornecimentos por passar a estar vencidos
        const Registro = await pool.query("SELECT equipments.approval_certificate,equipments.classification_size_id,equipments.current_balance,equipments.id,equipments.ideal_balance,equipments.price,equipments.validity, to_char(equipments.validity_certificate_approval, 'DD/MM/YYYY') as validity_certificate_approval, classification_sizes.size,CASE WHEN equipments.current_balance >= equipments.ideal_balance THEN 'ALTO' WHEN equipments.current_balance < equipments.ideal_balance THEN 'BAIXO' END status_balance, epis.type from equipments JOIN epis ON equipments.epi_id=epis.id JOIN classification_sizes ON equipments.classification_size_id=classification_sizes.id where equipments.project_id=($1) AND equipments.id=($2)",[decoded.project_id, updateEquipment.rows[0].id])
            res.status(200).send(Registro.rows[0])
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.patch('/equipment/delete/:id', checkToken, async (req, res) => {
    const { id } = req.params;
    try {
        const autHeader = req.headers['authorization']
        const tokenRecebido = autHeader && autHeader.split(" ")[1]
        const decoded = jwt.verify(tokenRecebido, secret);

        const getType = await pool.query("SELECT epi_id from equipments where id=($1)", [id])
        const getEquipment = await pool.query("SELECT epi_id from equipments where epi_id=($1) AND project_id=($2) AND status=($3)", [getType.rows[0].epi_id, decoded.project_id, 1])
        if (getEquipment.rowCount <= 0) {
            return res.status(400).json({ msg: "Você não pode excluir esse equipamento, pois está vinculado a um cargo/função" })
        }
        const deleteEquipment = await pool.query('UPDATE equipments SET status=($1) where id=($2) and project_id=($3) RETURNING *', [0, id, decoded.project_id])
        res.status(200).json({ msg: "Excluído com sucesso(s)" })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/equipments/inputType', checkToken, async (req, res) => {
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const decoded = jwt.verify(tokenRecebido, secret);
    try {
        const getEquipments = await pool.query("SELECT DISTINCT equipments.epi_id,epis.type  from equipments JOIN epis ON equipments.epi_id=epis.id where equipments.project_id=($1) AND equipments.status=($2) ORDER BY epis.type ASC", [decoded.project_id, 1])
        console.log(getEquipments.rows)
        res.status(200).send(getEquipments.rows)
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.post('/office/create', checkToken, async (req, res) => {
    const { name, selected, label } = req.body;
    try {
        const autHeader = req.headers['authorization']
        const tokenRecebido = autHeader && autHeader.split(" ")[1]
        const decoded = jwt.verify(tokenRecebido, secret);

        const getOffice = await pool.query("SELECT name from offices where  name=($1) AND project_id=($2) AND status=($3)", [name, decoded.project_id, 1])
        if (getOffice.rowCount > 0) {
            return res.status(400).json({ msg: "Parece que você já tem esse cargo/função cadastro em seu projeto!" })
        }
        const newOffice = await pool.query('INSERT INTO offices (name,epi_id, project_id ) VALUES ($1,$2,$3) RETURNING *', [name, selected, decoded.project_id])
        if (newOffice.rowCount > 0) {
            const newOffice2 = await pool.query("SELECT * FROM offices where offices.id=($1) AND project_id=($2)", [newOffice.rows[0].id,decoded.project_id])
           return res.status(200).send(newOffice2.rows[0])
            //res.status(200).send(newEquipment.rows[0])
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/offices', checkToken, async (req, res) => {
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const decoded = jwt.verify(tokenRecebido, secret);
    try {
        const getOffices = await pool.query("SELECT * FROM offices where project_id=($1) AND status=($2) ORDER BY name ASC", [decoded.project_id, 1])
        res.status(200).send(getOffices.rows)
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.get('/office/read/:id', checkToken, async (req, res) => {
    const { id } = req.params;

    try {
        const getOffice = await pool.query("SELECT * FROM offices where offices.id=($1)", [id])
        if (getOffice.rowCount < 1) {
            return res.status(400).json({ msg: "Houve um erro na solicitação: " })
        } else {
            res.status(200).send(getOffice.rows[0])
        }

    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.patch('/office/update', checkToken, async (req, res) => {
    const { id, selected,name } = req.body;

    try {
        const autHeader = req.headers['authorization']
        const tokenRecebido = autHeader && autHeader.split(" ")[1]
        const decoded = jwt.verify(tokenRecebido, secret);
        const getOffice = await pool.query("SELECT * FROM offices where offices.id=($1)", [id])
        const now = getOffice.rows[0].epi_id

        // função para comparar os array e identificar quais sairam
        var epi_id_out = now.filter(function (element, index, array) {
            if (selected.indexOf(element) == -1)
                return element;
        });
        // função para comparar os array e identificar quais entraram
        var epi_id_in = selected.filter(function (element, index, array) {
            if (now.indexOf(element) == -1)
                return element;
        });

        const updateOffice = await pool.query('UPDATE offices SET epi_id=($1),name=($2) where id=($3) and project_id=($4) RETURNING *', [selected, name, id, decoded.project_id])
        const getOffice2 = await pool.query("SELECT * FROM offices where offices.id=($1) AND project_id=($2)", [id,decoded.project_id])
        //saber quais epis sairam e entraram
        res.status(200).send(getOffice2.rows[0])
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.patch('/office/delete/:id', checkToken, async (req, res) => {
    const { id } = req.params;
    try {
        const autHeader = req.headers['authorization']
        const tokenRecebido = autHeader && autHeader.split(" ")[1]
        const decoded = jwt.verify(tokenRecebido, secret);

        const getEmployees = await pool.query("SELECT id from employees where id=($1)", [id])
        if (getEmployees.rowCount > 0) {
            return res.status(400).json({ msg: "Você não pode excluir esse cargo/função, pois tem colaboradores exercendo ela" })
        }
        const deleteEmloyees = await pool.query('UPDATE offices SET status=($1) where id=($2) and project_id=($3) RETURNING *', [0, id, decoded.project_id])
        res.status(200).json({ msg: "Excluído com sucesso(s)" })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.get('/teste', async (req, res) => {
    try {
        const getTest = await pool.quey("SELECT * from projects")
        return res.status(200).send(getTest.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.listen(PORT, () => console.log("servidor iniciado! porta: " + PORT))