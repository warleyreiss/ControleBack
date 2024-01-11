
app.get('/show_contract/:id', checkToken, async (req, res) => {
    const id = req.params.id
    try {
        const getContract = await pool.query('SELECT * FROM contratos WHERE id=($1)', [id])
        return res.status(200).send(getContract.rows[0])
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.patch('/update_contract', checkToken, async (req, res) => {
    const { id, nome, cnpj, endereco, responsavel, telefone, email, irpj, pis, cofis, csl, ibpt } = req.body;
    console.log(irpj.replace('.', '').replace(',', '.'))
    try {
        const updateContract = await pool.query('UPDATE contratos SET nome=($1), cnpj=($2), endereco=($3), responsavel=($4), telefone=($5), email=($6), irpj=($7), pis=($8), cofis=($9), csl=($10), ibpt=($11) where id=($12)', [nome, cnpj, endereco, responsavel, telefone, email, irpj.replace('.', '').replace(',', '.'), pis.replace('.', '').replace(',', '.'), cofis.replace('.', '').replace(',', '.'), csl.replace('.', '').replace(',', '.'), ibpt.replace('.', '').replace(',', '.'), id])
        return res.status(200).send(updateContract.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
//client ____________________________________________________________
app.get('/list_client', checkToken, async (req, res) => {
    try {
        const getClient = await pool.query("SELECT * FROM clientes WHERE status !='0' ORDER BY nome ASC ")
        return res.status(200).send(getClient.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_client_input', checkToken, async (req, res) => {
    try {
        const getClient = await pool.query('SELECT id,nome FROM clientes  WHERE status !=($1) ORDER BY NOME', [0])
        return res.status(200).send(getClient.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.post('/create_client', checkToken, async (req, res) => {
    const { contrato_id, nome, cnpj, responsavel, telefone, email, responsavel2, telefone2, email2, responsavel3, telefone3, email3, endereco, gps, distancia, valor_iss, valor_hora, valor_atendimento_frustado, valor_ociosidade, valor_violacao, valor_km, valor_hospedagem, valor_alimentacao, valor_instalacao_leve, valor_remocao_leve, valor_substituicao_leve, valor_instalacao_pesada, valor_remocao_pesada, valor_substituicao_pesada } = req.body;
    try {
        const newClient = await pool.query('INSERT INTO clientes (contrato_id,nome,cnpj, responsavel, telefone, email ,responsavel2, telefone2, email2 ,responsavel3, telefone3, email3 , endereco, gps, distancia, valor_iss, valor_hora,valor_atendimento_frustado,valor_ociosidade,valor_violacao,valor_km,valor_hospedagem,valor_alimentacao,valor_instalacao_leve,valor_remocao_leve,valor_substituicao_leve,valor_instalacao_pesada,valor_remocao_pesada,valor_substituicao_pesada ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29) RETURNING *', [contrato_id, nome, cnpj, responsavel, telefone, email, responsavel2, telefone2, email2, responsavel3, telefone3, email3, endereco, gps, distancia, valor_iss.replace('.', '').replace(',', '.'), valor_hora.replace('.', '').replace(',', '.'), valor_atendimento_frustado.replace('.', '').replace(',', '.'), valor_ociosidade.replace('.', '').replace(',', '.'), valor_violacao.replace('.', '').replace(',', '.'), valor_km.replace('.', '').replace(',', '.'), valor_hospedagem.replace('.', '').replace(',', '.'), valor_alimentacao.replace('.', '').replace(',', '.'), valor_instalacao_leve.replace('.', '').replace(',', '.'), valor_remocao_leve.replace('.', '').replace(',', '.'), valor_substituicao_leve.replace('.', '').replace(',', '.'), valor_instalacao_pesada.replace('.', '').replace(',', '.'), valor_remocao_pesada.replace('.', '').replace(',', '.'), valor_substituicao_pesada.replace('.', '').replace(',', '.')])
        const newUser = await pool.query('INSERT INTO usuarios (nome, email,tipo, setor, senha, cliente_id ) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [responsavel, email, 'GESTOR', 'CLIENTE', '12345678', newClient.rows[0].id])

        console.log(newClient.rows)
        console.log(newUser.rows)
        return res.status(200).send(newClient.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/show_client/:id', checkToken, async (req, res) => {
    const id = req.params.id
    try {
        const getClient = await pool.query('SELECT * FROM clientes WHERE id=($1)', [id])
        return res.status(200).send(getClient.rows[0])
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.patch('/update_client', checkToken, async (req, res) => {
    const { id, contrato_id, nome, cnpj, responsavel, telefone, email, responsavel2, telefone2, email2, responsavel3, telefone3, email3, endereco, gps, distancia, valor_iss, valor_hora, valor_atendimento_frustado, valor_ociosidade, valor_violacao, valor_km, valor_hospedagem, valor_alimentacao, valor_instalacao_leve, valor_remocao_leve, valor_substituicao_leve, valor_instalacao_pesada, valor_remocao_pesada, valor_substituicao_pesada } = req.body;
    try {
        const updateClient = await pool.query('UPDATE clientes SET contrato_id=($1), nome=($2), cnpj=($3), responsavel=($4), telefone=($5), email=($6), responsavel2=($7), telefone2=($8), email2=($9), responsavel3=($10), telefone3=($11), email3=($12), endereco=($13), gps=($14), distancia=($15), valor_iss=($16), valor_hora=($17), valor_atendimento_frustado=($18), valor_ociosidade=($19), valor_violacao=($20), valor_km=($21), valor_hospedagem=($22), valor_alimentacao=($23), valor_instalacao_leve=($24), valor_remocao_leve=($25), valor_substituicao_leve=($26), valor_instalacao_pesada=($27), valor_remocao_pesada=($28), valor_substituicao_pesada=($29) where id=($30)', [contrato_id, nome, cnpj, responsavel, telefone, email, responsavel2, telefone2, email2, responsavel3, telefone3, email3, endereco, gps, distancia, valor_iss.replace(',', '.'), valor_hora.replace(',', '.'), valor_atendimento_frustado.replace(',', '.'), valor_ociosidade.replace(',', '.'), valor_violacao.replace(',', '.'), valor_km.replace(',', '.'), valor_hospedagem.replace(',', '.'), valor_alimentacao.replace(',', '.'), valor_instalacao_leve.replace(',', '.'), valor_remocao_leve.replace(',', '.'), valor_substituicao_leve.replace(',', '.'), valor_instalacao_pesada.replace(',', '.'), valor_remocao_pesada.replace(',', '.'), valor_substituicao_pesada.replace(',', '.'), id])
        return res.status(200).send(updateClient.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

//user ________________________________________________________________________________________________
app.get('/list_user', checkToken, async (req, res) => {
    try {
        const getUser = await pool.query('SELECT usuarios.id, usuarios.setor, usuarios.nome as nome_usuarios, usuarios.tipo, clientes.nome as nome_clientes FROM usuarios LEFT OUTER JOIN clientes ON usuarios.cliente_id = clientes.id')
        return res.status(200).send(getUser.rows)
        console.log(getUser.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.get('/list_user_input', checkToken, async (req, res) => {
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    /* esse trecho do codigo foi desativado para atender a solicitação do Rodrigo para que o técnico possa abrir o proprio serviço, assim no campo de selecao irá connstar todos os técnicos
    if (decoded.tipo == 'TECNICO') {
    
            try {
                const getUser = await pool.query('SELECT id,nome FROM usuarios WHERE tipo=($1) AND id=($2)', ['TECNICO', decoded.id])
                return res.status(200).send(getUser.rows)
            } catch (err) {
                return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
            }
        } else {
            try {
                const getUser = await pool.query('SELECT id,nome FROM usuarios WHERE tipo=($1)', ['TECNICO'])
                return res.status(200).send(getUser.rows)
            } catch (err) {
                return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
            }
        }*/
    try {
        const getUser = await pool.query("SELECT id,nome FROM usuarios WHERE tipo=($1) or tipo=($2) and status !='0'", ['TECNICO', 'TERCEIRO'])
        return res.status(200).send(getUser.rows)
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_user_input_compulsory', checkToken, async (req, res) => {
    try {
        const getUser = await pool.query('SELECT usuarios.id, usuarios.nome as nome_usuarios, usuarios.tipo, clientes.nome as nome_clientes FROM usuarios LEFT OUTER JOIN clientes ON usuarios.cliente_id = clientes.id')
        return res.status(200).send(getUser.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_user_all_input', checkToken, async (req, res) => {
    try {
        const getUser = await pool.query('SELECT usuarios.id,usuarios.cliente_id, usuarios.nome as nome_usuario, clientes.nome as nome_cliente FROM usuarios JOIN clientes ON usuarios.cliente_id = clientes.id ORDER BY usuarios.nome ASC')
        return res.status(200).send(getUser.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_user_iternal_fleet', checkToken, async (req, res) => {
    try {
        const getUser = await pool.query("SELECT usuarios.id, usuarios.nome FROM usuarios WHERE setor !='CLIENTE' ORDER BY usuarios.nome ASC")
        return res.status(200).send(getUser.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_user_hardware', checkToken, async (req, res) => {
    try {
        const getUser = await pool.query("SELECT usuarios.id, usuarios.nome as nome_usuario FROM usuarios WHERE usuarios.setor='HARDWARE' ORDER BY usuarios.nome ASC")
        return res.status(200).send(getUser.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.post('/create_user', checkToken, async (req, res) => {
    const { tipo, setor, cliente_id, nome, email, frota_interna_id, senha } = req.body;

    //const salt = await bcrypt.genSalt(12)
    //const password = await bcrypt.hash(senha, salt)
    try {
        const newUser = await pool.query('INSERT INTO usuarios (tipo,setor, cliente_id, nome, email,senha) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id', [tipo, setor, cliente_id, nome, email, senha])
        if (frota_interna_id != '') {
            const updateFleet = await pool.query('UPDATE frota_internas SET usuario_id=($1), status = 2 WHERE id = ($2) RETURNING *', [newUser.rows[0].id, frota_interna_id])
        }
        else {
            const updateFleet = await pool.query('UPDATE frota_internas SET usuario_id=null, status = 1 WHERE usuario_id= ($1) RETURNING *', [newUser.rows[0].id])
        }
        return res.status(200).send('oi')
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/show_user/:id', checkToken, async (req, res) => {
    const id = req.params.id
    try {
        const getUser = await pool.query('SELECT * FROM usuarios WHERE id=($1)', [id])
        return res.status(200).send(getUser.rows[0])
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.patch('/update_user', checkToken, async (req, res) => {
    const { id, tipo, setor, cliente_id, nome, email, frota_interna_id, senha } = req.body;
    try {
        const updateUser = await pool.query('UPDATE usuarios SET tipo=($1), cliente_id=($2), nome=($3), email=($4) where id=($5)', [tipo, setor, cliente_id, nome, email, id])
        if (frota_interna_id != '') {
            const updateFleet = await pool.query('UPDATE frota_internas SET usuario_id=($1), status = 2 WHERE id = ($2) RETURNING *', [id, frota_interna_id])
        }
        else {
            const updateFleet = await pool.query('UPDATE frota_internas SET usuario_id=null, status = 1 WHERE usuario_id= ($1) RETURNING *', [id])
        }
        return res.status(200).send(updateUser.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
//vechicle ________________________________________________________________________________________________
app.get('/list_vehicle', checkToken, async (req, res) => {
    try {
        const getVehicle = await pool.query('SELECT veiculos.id, veiculos.placa, veiculos.frota, veiculos.tipo, clientes.nome FROM veiculos LEFT OUTER JOIN clientes ON veiculos.cliente_id = clientes.id ORDER BY veiculos.PLACA ASC')
        return res.status(200).send(getVehicle.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.post('/create_vehicle', checkToken, async (req, res) => {
    const { placa, frota, tipo, cliente_id } = req.body;

    try {
        const newVehicle = await pool.query('INSERT INTO veiculos (placa, frota,tipo, cliente_id) VALUES ($1,$2,$3,$4) RETURNING *', [placa, frota, tipo, cliente_id])
        return res.status(200).send(newVehicle)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.get('/list_vehicle_input/:id', checkToken, async (req, res) => {
    const id = req.params.id
    try {
        const getService = await pool.query('SELECT cliente_id FROM servicos WHERE id =($1)', [id])
        const getVehicle = await pool.query('SELECT veiculos.id, veiculos.placa, veiculos.frota FROM veiculos WHERE veiculos.cliente_id =($1)', [getService.rows[0].cliente_id])
        return res.status(200).send(getVehicle.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/show_vehicle/:id', checkToken, async (req, res) => {
    const id = req.params.id
    try {
        const getVehicle = await pool.query('SELECT * FROM veiculos WHERE id=($1)', [id])
        return res.status(200).send(getVehicle.rows[0])
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.patch('/update_vehicle', checkToken, async (req, res) => {
    const { id, placa, frota, tipo, cliente_id } = req.body;
    try {
        const updateVehicle = await pool.query('UPDATE veiculos SET placa=($1), frota=($2), tipo=($3), cliente_id=($4) where id=($5)', [placa, frota, tipo, cliente_id, id])

        return res.status(200).send(updateVehicle.rows[0])
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
//equipment ________________________________________________________________________________________________
app.post('/create_equipment', checkToken, async (req, res) => {
    const { numero_serie, identificador, tipo } = req.body;

    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    try {
        const getEquipment = await pool.query('SELECT * FROM equipamentos WHERE numero_serie=($1)', [numero_serie])
        if (Object.keys(getEquipment.rows).length > 0) {
            return res.status(200).json({ msg: "Já existente equipamento cadastro com este número de série!" })
        } else {
            const newEquipment = await pool.query('INSERT INTO equipamentos (numero_serie,identificador, tipo, usuario_id,cliente_id) VALUES ($1,$2,$3,$4,$5) RETURNING *', [numero_serie, identificador, tipo, decoded.id, decoded.cliente])
            const newMovement = await pool.query('INSERT INTO movimento_equipamentos (equipamento_id,cliente_id_saiu,usuario_id_saiu,cliente_id_entrou,usuario_id_entrou,motivo) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [newEquipment.rows[0].id, decoded.cliente, decoded.id, decoded.cliente, decoded.id, 'CADASTRO EQUIPAMENTO'])

            return res.status(200).send(newEquipment.rows)
        }
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.post('/create_equipment_compulsory', checkToken, async (req, res) => {
    const { numero_serie, identificador, tipo, usuario_id } = req.body;
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);

    try {
        const getUser = await pool.query('SELECT cliente_id FROM usuarios WHERE id=($1)', [usuario_id])
        const newEquipment = await pool.query('INSERT INTO equipamentos (numero_serie,identificador, tipo, usuario_id,cliente_id,status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [numero_serie, identificador, tipo, usuario_id, getUser.rows[0].cliente_id, '2'])
        const newMovement = await pool.query('INSERT INTO movimento_equipamentos (equipamento_id,cliente_id_saiu,usuario_id_saiu,cliente_id_entrou,usuario_id_entrou,motivo) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [newEquipment.rows[0].id, decoded.cliente, decoded.id, getUser.rows[0].cliente_id, usuario_id, 'CADASTRO EQUIPAMENTO COMPUSORIO'])
        return res.status(200).send(newEquipment)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.post('/create_equipment_compulsory_unworn', checkToken, async (req, res) => {
    const { numero_serie, identificador, tipo, usuario_id } = req.body;
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);

    try {
        const getUser = await pool.query('SELECT cliente_id FROM usuarios WHERE id=($1)', [usuario_id])
        const newEquipment = await pool.query('INSERT INTO equipamentos (numero_serie,identificador, tipo, usuario_id,cliente_id,status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [numero_serie, identificador, tipo, usuario_id, getUser.rows[0].cliente_id, '1'])
        const newMovement = await pool.query('INSERT INTO movimento_equipamentos (equipamento_id,cliente_id_saiu,usuario_id_saiu,cliente_id_entrou,usuario_id_entrou,motivo) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [newEquipment.rows[0].id, decoded.cliente, decoded.id, getUser.rows[0].cliente_id, usuario_id, 'CADASTRO EQUIPAMENTO COMPUSORIO COMO DISPONÍVEL'])
        console.log(newEquipment.rows)
        return res.status(200).send(newEquipment)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/show_equipment/:id', checkToken, async (req, res) => {
    const id = req.params.id
    try {
        const getEquipment = await pool.query('SELECT * FROM equipamentos WHERE id=($1)', [id])
        return res.status(200).send(getEquipment.rows[0])
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.patch('/update_equipment', checkToken, async (req, res) => {
    const { id, identificador } = req.body;
    try {
        const updateEquipment = await pool.query('UPDATE equipamentos SET identificador=($1) where id=($2)', [identificador, id])
        return res.status(200).send(updateEquipment.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.post('/delete_equipment', checkToken, async (req, res) => {
    const { id, numero_serie, motivo, justificativa } = req.body
    try {
        const updateEquipment = await pool.query('UPDATE equipamentos SET status=($1) WHERE id =($2) RETURNING *', ['0', id])
        const newEquipments = await pool.query('INSERT INTO equipamento_descartados (equipamento_id,numero_serie, motivo, justificativa) VALUES ($1,$2,$3,$4) RETURNING *', [equipamento_id, numero_serie, motivo, justificativa])
        //cadastrar item na tabela movimentos de equipamentos
        return res.status(200).send(updateEquipment)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.post('/transfer_equipment_request', checkToken, async (req, res) => {

    const { usuario_id, chamado, situacao, periferico_id, qdade_periferico_id } = req.body
    // criação do array dos equipamentos recebiodos
    let listEquipment = []
    const equipamento_id_multi_select = []
    req.body.equipamento_id_multi_select.map((id) => { equipamento_id_multi_select.push(id.value) })
    listEquipment = equipamento_id_multi_select

    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    const getUser = await pool.query('SELECT cliente_id,setor FROM usuarios WHERE id=($1)', [usuario_id])
    try {
        //PROSECUÇÃO DOS PERIFERICOS-INSUMOS ***********************************************
        periferico_id.map(async (periferico, key) => {

            let newInsumo = await pool.query('INSERT INTO movimento_insumos (chamado_id,insumo_id,quantidade,usuario_id,cliente_id,situacao) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [chamado, periferico, qdade_periferico_id[key], usuario_id, getUser.rows[0].cliente_id, situacao])
            if (getUser.rows[0].setor == 'CLIENTE') {
                console.log('é ckiente')
                if (situacao == "MANUTENCAO" || situacao == "PEDIDO DE COMPRA") {
                    const getInsumo = await pool.query('SELECT valor, item FROM insumos WHERE id =($1)', [periferico])
                    const newTicket = await pool.query('INSERT INTO faturamentos(usuario_id,chamado_id, cliente_id,tipo,setor,descricao, quantidade, unidade,valor,observacao) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *', [decoded.id, chamado, getUser.rows[0].cliente_id, 'MATERIAIS', decoded.setor, getInsumo.rows[0].item, '1', 'UN', getInsumo.rows[0].valor * qdade_periferico_id[key], 'REFERENTE AO ATENDIMENTO CHAMADO: ' + chamado])
                }
            }

        })
        //PROSECUÇÃO DOS EQUIPAMENTOS ***********************************************
        listEquipment.map(async (equipamento, key) => {
            let updateEquipment = await pool.query('UPDATE equipamentos SET status=($1), usuario_id=($2), cliente_id=($3) WHERE id =($4) RETURNING *', ['1', usuario_id, getUser.rows[0].cliente_id, equipamento])
            let newMovement = await pool.query('INSERT INTO movimento_equipamentos (equipamento_id,cliente_id_saiu,usuario_id_saiu,cliente_id_entrou,usuario_id_entrou,motivo,chamado) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *', [equipamento, decoded.id, decoded.cliente, getUser.rows[0].cliente_id, usuario_id, 'TRANSFERENCIA REALIZADA VIA CHAMADO', chamado])
            if (getUser.rows[0].setor == 'CLIENTE') {
                console.log('é Kiente')

                if (situacao == "PEDIDO DE COMPRA") {
                    console.log('vai cobrar pela combra')
                    const getEquipment = await pool.query('SELECT tipo FROM equipamentos WHERE id =($1)', [equipamento])
                    const getInsumo = await pool.query('SELECT valor, item FROM insumos WHERE item =($1)', [getEquipment.rows[0].tipo])
                    const newTicket = await pool.query('INSERT INTO faturamentos(usuario_id,chamado_id, cliente_id,tipo,setor,descricao, quantidade, unidade,valor,observacao) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *', [decoded.id, chamado, getUser.rows[0].cliente_id, 'MATERIAIS', decoded.setor, getInsumo.rows[0].item, '1', 'UN', getInsumo.rows[0].valor, 'REFERENTE AO ATENDIMENTO CHAMADO: ' + chamado])

                }
            }
        })
        let newchamdo = await pool.query('INSERT INTO atendimento_chamados (cliente_id,usuario_id,chamado) VALUES ($1,$2,$3) RETURNING *', [getUser.rows[0].cliente_id, usuario_id, chamado])
        //PROSECUÇÃO DAS DESPESAS EXTRAS ***********************************************
        const newTicket = await pool.query('INSERT INTO faturamentos(usuario_id,chamado_id, cliente_id,tipo,setor,descricao, quantidade, unidade,valor,observacao) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *', [decoded.id, chamado, getUser.rows[0].cliente_id, 'MATERIAIS', decoded.setor, 'ENVIO MATERIAIS', '1', 'UN', 1, 'REFERENTE AO ATENDIMENTO CHAMADO: ' + chamado])

        return res.status(200).json({ msg: "Chamado atendido com sucesso!" })
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.post('/transfer_equipment', checkToken, async (req, res) => {

    const { usuario_id, chamado, equipamento_id } = req.body
    let listEquipment = []
    const equipamento_id_multi_select = []

    if (!equipamento_id) {
        //criando a const que recebe o campo a lista dos equipamentos e transforma em array numerico
        req.body.equipamento_id_multi_select.map((id) => { equipamento_id_multi_select.push(id.value) })
        listEquipment = equipamento_id_multi_select
    } else {
        listEquipment = equipamento_id
    }
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    const getUser = await pool.query('SELECT cliente_id FROM usuarios WHERE id=($1)', [usuario_id])
    try {
        listEquipment.map(async (equipamento, key) => {
            console.log(equipamento)
            let updateEquipment = await pool.query('UPDATE equipamentos SET status=($1), usuario_id=($2), cliente_id=($3) WHERE id =($4) RETURNING *', ['3', usuario_id, getUser.rows[0].cliente_id, equipamento])
            let newMovement = await pool.query('INSERT INTO movimento_equipamentos (equipamento_id,cliente_id_saiu,usuario_id_saiu,cliente_id_entrou,usuario_id_entrou,motivo,chamado) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *', [equipamento, decoded.cliente, decoded.id, getUser.rows[0].cliente_id, usuario_id, 'TRANSFERENCIA EFETUADA', chamado])
        })
        //let newchamdo = await pool.query('INSERT INTO atendimento_chamados (equipamento_id,cliente_id,usuario_id,chamado) VALUES ($1,$2,$3,$4) RETURNING *', [equipamento_id, getUser.rows[0].cliente_id, usuario_id, chamado])

        return res.status(200).send()
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.post('/return_equipment', checkToken, async (req, res) => {
    const { equipamento_id, cliente_id, usuario_id, motivo } = req.body
    let listEquipment = []
    const equipamento_id_multi_select = []

    if (!equipamento_id) {
        //criando a const que recebe o o campo a lista dos equipamentos e transforma em array numerico
        req.body.equipamento_id_multi_select.map((id) => { equipamento_id_multi_select.push(id.value) })
        listEquipment = equipamento_id_multi_select
    } else {
        listEquipment = equipamento_id
    }
    console.log('equipamentos', listEquipment)
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    try {
        //CRIO O ENVOLUTRO
        const newService = await pool.query('INSERT INTO hardware_servicos (usuario_id, cliente_id, status) VALUES ($1,$2,$3) RETURNING *', [usuario_id, cliente_id, '1'])
        console.log('servico->', newService.rows)
        listEquipment.map(async (equipamento, key) => {
            //CRIO AS OS
            let newOrderService = await pool.query('INSERT INTO hardware_ordem_servicos (hardware_servicos_id, usuario_id,equipamento_id, status) VALUES ($1,$2,$3,$4) RETURNING *', [newService.rows[0].id, usuario_id, equipamento, '1'])
            console.log('ordem servico->', newOrderService.rows)
            //MOVIMENTOS
            const getequipment = await pool.query('SELECT usuario_id, cliente_id FROM equipamentos WHERE id=($1)', [equipamento])
            console.log('get equipamento->', getequipment.rows)
            let newMovement = await pool.query('INSERT INTO movimento_equipamentos (equipamento_id,cliente_id_saiu,usuario_id_saiu,cliente_id_entrou,usuario_id_entrou,motivo) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [equipamento, getequipment.rows[0].usuario_id, getequipment.rows[0].cliente_id, usuario_id, decoded.cliente, 'RETORNO MANUAL/ ENCAMINHADO AO HARDWARE'])
            console.log('movimente->', newMovement.rows)
            // TRASFIRO
            let updateEquipment = await pool.query('UPDATE equipamentos SET status=($1), usuario_id=($2), cliente_id=($3) WHERE id =($4) RETURNING *', ['4', usuario_id, decoded.cliente, equipamento])
            console.log('update equipment->', updateEquipment.rows)
        })
        return res.status(200).send()
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.post('/adjunt_equipment', checkToken, async (req, res) => {

    const { usuario_id, status, equipamento_id } = req.body
    let listEquipment = []
    const equipamento_id_multi_select = []

    if (!equipamento_id) {
        //criando a const que recebe o o campo a lista dos equipamentos e transforma em array numerico
        req.body.equipamento_id_multi_select.map((id) => { equipamento_id_multi_select.push(id.value) })
        listEquipment = equipamento_id_multi_select
    } else {
        listEquipment = equipamento_id
    }
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    const getUser = await pool.query('SELECT cliente_id FROM usuarios WHERE id=($1)', [usuario_id])
    try {
        listEquipment.map(async (equipamento, key) => {
            console.log(equipamento)
            let updateEquipment = await pool.query('UPDATE equipamentos SET status=($1), usuario_id=($2), cliente_id=($3) WHERE id =($4) RETURNING *', [status, usuario_id, getUser.rows[0].cliente_id, equipamento])
            let newMovement = await pool.query('INSERT INTO movimento_equipamentos (equipamento_id,cliente_id_saiu,usuario_id_saiu,cliente_id_entrou,usuario_id_entrou,motivo) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [equipamento, getUser.rows[0].cliente_id, usuario_id, getUser.rows[0].cliente_id, usuario_id, 'AJUSTE MANUAL DO ESTOQUE'])
        })
        return res.status(200).send()
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.post('/accept_equipment', checkToken, async (req, res) => {
    const { equipamento_id } = req.body
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    try {
        equipamento_id.map(async (equipamento, key) => {
            let updateEquipment = await pool.query('UPDATE equipamentos SET status=($1) WHERE id =($2) RETURNING *', ['1', equipamento])
            let getMovement = await pool.query('SELECT cliente_id_saiu, usuario_id_saiu FROM movimento_equipamentos WHERE equipamento_id=($1) order by id desc limit 1', [equipamento])
            let newMovement = await pool.query('INSERT INTO movimento_equipamentos (equipamento_id,cliente_id_saiu,usuario_id_saiu,cliente_id_entrou,usuario_id_entrou,motivo) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [equipamento, getMovement.rows[0].cliente_id_saiu, getMovement.rows[0].usuario_id_saiu, decoded.cliente, decoded.id, 'TRANSFERENCIA ACEITA'])
        })
        return res.status(200).send()
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.post('/refuse_equipment', checkToken, async (req, res) => {
    const { equipamento_id } = req.body
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    try {

        equipamento_id.map(async (equipamento, key) => {
            let getMovement = await pool.query('SELECT id, cliente_id_saiu, usuario_id_saiu FROM movimento_equipamentos WHERE equipamento_id=($1) order by id desc limit 1', [equipamento])
            let updateEquipment = await pool.query('UPDATE equipamentos SET usuario_id=($1), cliente_id=($2), status=($3) WHERE id =($4) RETURNING *', [getMovement.rows[0].usuario_id_saiu, getMovement.rows[0].cliente_id_saiu, '1', equipamento])
            let newMovement = await pool.query('INSERT INTO movimento_equipamentos (equipamento_id,cliente_id_saiu,usuario_id_saiu,cliente_id_entrou,usuario_id_entrou,motivo) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [equipamento, getMovement.rows[0].cliente_id_saiu, getMovement.rows[0].usuario_id_saiu, decoded.cliente, decoded.id, 'TRANSFERENCIA RECUSADA'])

        })
        return res.status(200).send()
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_equipment_all', checkToken, async (req, res) => {
    try {
        const getEquipments = await pool.query("SELECT equipamentos.id,equipamentos.numero_serie, equipamentos.identificador,equipamentos.tipo, clientes.nome as nome_cliente, usuarios.nome as nome_usuario, equipamentos.status,CASE WHEN equipamentos.status = '1' THEN 'DISPONÍVEL' WHEN equipamentos.status = '2' THEN 'EM USO' WHEN equipamentos.status = '3' THEN 'EM APROVAÇÃO' END status_descricao FROM equipamentos LEFT OUTER JOIN usuarios ON equipamentos.usuario_id = usuarios.id LEFT OUTER JOIN clientes ON equipamentos.cliente_id = clientes.id WHERE equipamentos.status !=($1)", ['0'])

        return res.status(200).send(getEquipments.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_equipment_me', checkToken, async (req, res) => {
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    try {
        const getEquipments = await pool.query('SELECT id, identificador,numero_serie, tipo FROM equipamentos WHERE usuario_id= ($1) AND status =($2)', [decoded.id, 1])
        return res.status(200).send(getEquipments.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_equipment_others', checkToken, async (req, res) => {
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    try {
        const getEquipments = await pool.query('SELECT id, identificador,numero_serie, tipo FROM equipamentos WHERE usuario_id !=($1)', [decoded.id])
        return res.status(200).send(getEquipments.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_equipment_stocks', checkToken, async (req, res) => {
    try {
        const getEquipments = await pool.query('SELECT id, nome FROM clientes')
        return res.status(200).send(getEquipments.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_equipment_user/:id?', checkToken, async (req, res) => {
    const id = req.params.id
    try {
        const getEquipments = await pool.query("SELECT equipamentos.id,equipamentos.identificador,equipamentos.tipo,equipamentos.status,CASE WHEN equipamentos.status = '1' THEN 'DISPONÍVEL' WHEN equipamentos.status = '2' THEN 'EM USO' WHEN equipamentos.status = '3' THEN 'EM APROVAÇÃO' END status_descricao  FROM equipamentos WHERE usuario_id=($1) AND status!=($2)", [id, '0'])
        return res.status(200).send(getEquipments.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.get('/list_equipment_warehouse/:id?', checkToken, async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const getEquipments = await pool.query("SELECT equipamentos.id,equipamentos.identificador,equipamentos.tipo, usuarios.nome,equipamentos.status,CASE WHEN equipamentos.status = '1' THEN 'DISPONÍVEL' WHEN equipamentos.status = '2' THEN 'EM USO' WHEN equipamentos.status = '3' THEN 'EM APROVAÇÃO' END status_descricao FROM equipamentos JOIN usuarios ON equipamentos.usuario_id=usuarios.id WHERE equipamentos.cliente_id=($1) AND equipamentos.status !=($2)", [id, '0'])
        return res.status(200).send(getEquipments.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_equipment_warehouse_input/:id?', checkToken, async (req, res) => {
    const id = req.params.id
    try {
        const getService = await pool.query('SELECT servico_id FROM ordem_servicos WHERE id=($1)', [id])

        const getClient = await pool.query('SELECT cliente_id FROM servicos WHERE id=($1)', [getService.rows[0].servico_id])
        console.log(getClient.rows)
        const getEquipments = await pool.query('SELECT * FROM equipamentos WHERE cliente_id=($1) AND status=($2)', [getClient.rows[0].cliente_id, '2'])
        console.log(getEquipments.rows)
        return res.status(200).send(getEquipments.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_equipment_warehouse_input_removal/:id?', checkToken, async (req, res) => {
    const id = req.params.id
    try {
        const getService = await pool.query('SELECT servico_id FROM ordem_servicos WHERE id=($1)', [id])
        const getClient = await pool.query('SELECT cliente_id FROM servicos WHERE id=($1)', [getService.rows[0].servico_id])
        const getEquipments = await pool.query('SELECT * FROM equipamentos WHERE cliente_id=($1) AND status=($2)', [getClient.rows[0].cliente_id, '2'])
        console.log(getEquipments.rows)
        return res.status(200).send(getEquipments.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.get('/list_peripheral_input', checkToken, async (req, res) => {
    try {
        const getInput = await pool.query('SELECT item,id FROM insumos WHERE tipo=($1)', ['PERIFERICO'])
        return res.status(200).send(getInput.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_equipment_input', checkToken, async (req, res) => {
    try {
        const getInput = await pool.query('SELECT item,id FROM insumos WHERE tipo=($1)', ['EQUIPAMENTO'])
        return res.status(200).send(getInput.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_equipment_input_terceiro/:id?', checkToken, async (req, res) => {
    const id = req.params.id
    console.log('id é ' + id)
    console.log(req.params)
    try {
        const getService = await pool.query('SELECT servico_id FROM ordem_servicos WHERE id=($1)', [id])

        const getClient = await pool.query('SELECT cliente_id FROM servicos WHERE id=($1)', [getService.rows[0].servico_id])
        const getEquipments = await pool.query('SELECT * FROM equipamentos WHERE cliente_id=($1) AND status=($2)', [getClient.rows[0].cliente_id, '1'])
        return res.status(200).send(getEquipments.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_insumo_input', checkToken, async (req, res) => {
    try {
        const getInput = await pool.query('SELECT item,id FROM insumos ')
        return res.status(200).send(getInput.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_equipment_accept', checkToken, async (req, res) => {
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    try {
        const getEquipments = await pool.query("SELECT id, identificador,numero_serie, tipo, status,to_char(data_registro, 'DD/MM/YYYY') as data_registro  FROM equipamentos WHERE usuario_id= ($1) AND status =($2)", [decoded.id, '3'])
        return res.status(200).send(getEquipments.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.get('/list_movement_equipment/:numero_serie', checkToken, async (req, res) => {
    const numero_serie = req.params.numero_serie

    try {
        const getEquipments = await pool.query('SELECT id FROM equipamentos WHERE numero_serie= ($1)', [numero_serie])

        const getMovement = await pool.query("SELECT movimento_equipamentos.motivo,movimento_equipamentos.chamado,to_char(movimento_equipamentos.data_registro, 'DD/MM/YYYY') as data_registro, usuarios.nome as nome_usuario, clientes.nome as nome_cliente FROM movimento_equipamentos JOIN usuarios ON movimento_equipamentos.usuario_id_entrou = usuarios.id JOIN clientes ON movimento_equipamentos.cliente_id_entrou = clientes.id WHERE movimento_equipamentos.equipamento_id=($1)", [getEquipments.rows[0].id])

        return res.status(200).send(getMovement.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_request', checkToken, async (req, res) => {
    try {
        const getRequest = await pool.query("SELECT atendimento_chamados.id,atendimento_chamados.chamado, to_char(atendimento_chamados.data_registro, 'DD/MM/YYYY') as data, clientes.nome as nomeCliente, usuarios.nome as nomeUsuario FROM atendimento_chamados JOIN clientes ON atendimento_chamados.cliente_id = clientes.id JOIN usuarios ON atendimento_chamados.usuario_id = usuarios.id")
        return res.status(200).send(getRequest.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.get('/request_show/:id', checkToken, async (req, res) => {
    id = req.params.id

    try {
        const getRequest = await pool.query("SELECT atendimento_chamados.id,atendimento_chamados.chamado, to_char(atendimento_chamados.data_registro, 'DD/MM/YYYY') as data, clientes.nome as nomeCliente  , usuarios.nome as nomeUsuario FROM atendimento_chamados JOIN clientes ON atendimento_chamados.cliente_id = clientes.id JOIN usuarios ON atendimento_chamados.usuario_id = usuarios.id WHERE atendimento_chamados.id=($1)", [id])
        const getEquipment = await pool.query("SELECT equipamentos.numero_serie, equipamentos.identificador, equipamentos.tipo FROM movimento_equipamentos JOIN equipamentos ON movimento_equipamentos.equipamento_id = equipamentos.id WHERE movimento_equipamentos.chamado=($1)", [getRequest.rows[0].chamado])
        const getInsumos = await pool.query("SELECT insumos.item, insumos.valor, movimento_insumos.quantidade FROM movimento_insumos JOIN insumos ON movimento_insumos.insumo_id = insumos.id WHERE movimento_insumos.chamado_id=($1)", [getRequest.rows[0].chamado])

        return res.json({ registro: getRequest.rows[0], insumos: getInsumos.rows, equipamentos: getEquipment.rows })
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
//service ________________________________________________________________________________________________
app.post('/create_service', checkToken, async (req, res) => {
    const { chamado, cliente_id, inicio, termino, turno, observacao } = req.body;
    const usuario_id = []
    req.body.usuario_id.map((id) => { usuario_id.push(id.value) })
    try {
        const newService = await pool.query('INSERT INTO servicos (chamado, cliente_id, inicio, termino, turno, usuario_id,observacao) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *', [chamado, cliente_id, inicio, termino, turno, usuario_id, observacao])
        return res.status(200).send(newService.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.get('/list_service', checkToken, async (req, res) => {
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    if (decoded.tipo == 'TECNICO' || decoded.tipo == 'TERCEIRO') {
        try {
            const getService = await pool.query("SELECT servicos.id, to_char(inicio, 'DD/MM/YYYY') as inicio, to_char(termino, 'DD/MM/YYYY') as termino, clientes.nome, clientes.responsavel, clientes.gps, servicos.observacao FROM servicos JOIN clientes ON servicos.cliente_id = clientes.id WHERE servicos.status =($1) AND usuario_id @> array[" + decoded.id + "] ORDER BY id DESC", ['1'])
            console.log(getService.rows)
            return res.status(200).send(getService.rows)
        } catch (err) {

            return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
        }
    } else {
        try {
            const getService = await pool.query("SELECT servicos.id,servicos.turno, to_char(inicio, 'DD/MM/YYYY') as inicio, to_char(termino, 'DD/MM/YYYY') as termino, clientes.nome, clientes.responsavel, clientes.gps, servicos.observacao FROM servicos JOIN clientes ON servicos.cliente_id = clientes.id WHERE servicos.status =($1) ORDER BY id DESC", ['1'])
            return res.status(200).send(getService.rows)
        } catch (err) {

            return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
        }
    }
})
app.get('/list_service_all', checkToken, async (req, res) => {
    try {

        const getService = await pool.query("SELECT servicos.id, to_char(servicos.inicio, 'DD/MM/YYYY') as inicio, to_char(servicos.termino, 'DD/MM/YYYY') as termino, servicos.status,CASE WHEN servicos.status = '1' THEN 'EM ABERTO' WHEN servicos.status = '2' THEN 'FINALIZADO' WHEN servicos.status = '0' THEN 'CANCELADO' END status_descricao,clientes.nome, clientes.responsavel FROM servicos JOIN clientes ON servicos.cliente_id = clientes.id WHERE servicos.status !=($1) ORDER BY id ASC", ['0'])
        return res.status(200).send(getService.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_service_show/:id', checkToken, async (req, res) => {
    id = req.params.id
    try {
        const getService = await pool.query("SELECT servicos.id, to_char(servicos.inicio, 'DD/MM/YYYY') as inicio, to_char(servicos.termino, 'DD/MM/YYYY') as termino, servicos.status, clientes.nome, clientes.responsavel FROM servicos JOIN clientes ON servicos.cliente_id = clientes.id WHERE servicos.status !=($1) ORDER BY id ASC", ['0'])
        return res.status(200).send(getService.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/service_show/:id', checkToken, async (req, res) => {
    id = req.params.id
    try {
        const getService = await pool.query("SELECT servicos.id,servicos.observacao, servicos.chamado, servicos.turno, to_char(servicos.inicio, 'DD/MM/YYYY') as inicio, to_char(servicos.termino, 'DD/MM/YYYY') as termino, servicos.status, clientes.nome, clientes.responsavel FROM servicos JOIN clientes ON servicos.cliente_id = clientes.id WHERE servicos.id=($1)", [id])
        const getOrderService = await pool.query('SELECT ordem_servicos.id,ordem_servicos.tipo, ordem_servicos.produto,ordem_servicos.status, usuarios.nome, veiculos.placa,veiculos.frota FROM ordem_servicos JOIN usuarios ON ordem_servicos.usuario_id = usuarios.id JOIN veiculos ON ordem_servicos.veiculo_id = veiculos.id WHERE ordem_servicos.servico_id=($1) ORDER BY ordem_servicos.id ASC', [getService.rows[0].id])
        const getVisit = await pool.query("SELECT visitas.id, visitas.usuario_id,to_char(visitas.inicio, 'DD/MM/YYYY HH24:MI') as inicio,to_char(visitas.termino, 'DD/MM/YYYY HH24:MI') as termino, to_char(visitas.data_registro, 'DD/MM/YYYY') as data_registro, visitas.ajuste FROM visitas WHERE visitas.servico_id=($1) ORDER BY visitas.id ASC", [getService.rows[0].id])

        return res.json({ service: getService.rows[0], ordem_service: getOrderService.rows, visit: getVisit.rows })
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.patch('/service_cancel', checkToken, async (req, res) => {
    const { id, motivo } = req.body;
    const today = new Date();
    today.setHours(today.getHours() - 3);
    try {
        const getVisit = await pool.query('SELECT * FROM visitas WHERE servico_id=($1) AND status=($2)', [id, 1])
        const getOS = await pool.query("SELECT * FROM ordem_servicos WHERE servico_id=($1) and status !='0' and status!='4'", [id])
        if (Object.keys(getVisit.rows).length > 0) {
            // console.log(Object.keys(getVisit.rows).length)
            return res.status(200).json({ msg: "Há técnico(a) com visita em aberto neste momento, por isso será necessário aguardar o seu término." })
        } if (Object.keys(getOS.rows).length > 0) {
            console.log(Object.keys(getOS.rows).length)
            return res.status(200).json({ msg: "Há Ordens de Serviços ainda em executação." })
        } else {
            updateService = await pool.query('UPDATE servicos SET motivo_cancelamento=($1), data_finalizado=($2), status=($3) WHERE id =($4) RETURNING *', [motivo, today, '0', id])
            return res.status(200).json({ msg: "Serviço concelado." })
        }
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.patch('/service_finalized', checkToken, async (req, res) => {
    const { id, entrevistado, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5, sugestao_reclamacao } = req.body;
    const today = new Date();
    today.setHours(today.getHours() - 3);
    try {
        const getVisit = await pool.query('SELECT * FROM visitas WHERE servico_id=($1) AND status=($2)', [id, 1])
        const getOS = await pool.query("SELECT * FROM ordem_servicos WHERE servico_id=($1) and status !='0' and status!='4'", [id])
        if (Object.keys(getVisit.rows).length > 0) {
            // console.log(Object.keys(getVisit.rows).length)
            return res.status(200).json({ msg: "Há técnico(a) com visita em aberto neste momento, por isso será necessário aguardar o seu término." })
        } if (Object.keys(getOS.rows).length > 0) {
            console.log(Object.keys(getOS.rows).length)
            return res.status(200).json({ msg: "Há Ordens de Serviços ainda em executação." })
        } else {
            updateService = await pool.query('UPDATE servicos SET  data_finalizado=($1), status=($2) WHERE id =($3) RETURNING *', [today, '2', id])
            const newAvaliation = await pool.query('INSERT INTO avaliacao_atendimentos (servico_id, entrevistado, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5,sugestao_reclamacao) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *', [id, entrevistado, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5, sugestao_reclamacao])
            res.status(200).json({ msg: "Serviço finalizado." })
        }
    } catch (err) {
        res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
//ordem de servico ________________________________________________________________________________________________
app.post('/create_order_service', checkToken, async (req, res) => {
    const { servico_id, tipo, produto, veiculo_remocao_id, observacao } = req.body;
    const veiculo_id = []
    req.body.veiculo_id.map((id) => { veiculo_id.push(id.value) })
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    console.log(observacao)
    try {
        veiculo_id.map(async (veiculo, key) => {
            const newOrderService = await pool.query('INSERT INTO ordem_servicos (servico_id, tipo,produto,veiculo_id,veiculo_remocao_id,usuario_id, observacao) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *', [servico_id, tipo, produto, veiculo, veiculo_remocao_id, decoded.id, observacao])
            //cryptografar aqui o byctipt_id
        })

        return res.status(200).json({ msg: "Ordens de servicos criadas" })
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_ordem_service_all', checkToken, async (req, res) => {
    try {
        const getService = await pool.query('SELECT * FROM ordem_servicos')
        return res.status(200).send(getService.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_ordem_service_active', checkToken, async (req, res) => {


    try {
        const getService = await pool.query('SELECT ordem_servicos.id, ordem_servicos.servico_id, ordem_servicos.veiculo_id, ordem_servicos.tipo, ordem_servicos.produto, ordem_servicos.status, ordem_servicos.observacao  ,veiculos.placa,veiculos.frota FROM ordem_servicos JOIN veiculos ON ordem_servicos.veiculo_id = veiculos.id WHERE ordem_servicos.status !=($1) ORDER BY servico_id ASC,id ASC', ['0'])
        return res.status(200).send(getService.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }

})

app.patch('/order_service_cancel', checkToken, async (req, res) => {
    const { id, motivo } = req.body;
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    const today = new Date();
    today.setHours(today.getHours() - 3);
    try {
        updateService = await pool.query('UPDATE ordem_servicos SET motivo_cancelamento=($1), termino=($2), status=($3) WHERE id =($4) RETURNING *', [motivo, today, '0', id])
        return res.status(200).json({ msg: "Ordem serviço Cancelada." })

    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.patch('/update_order_service_assess', checkToken, checkVisit, upload.array('imagem[]'), async (req, res) => {
    const { idOS, atendimento, motivo_nao_atendimento } = req.body;
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);

    try {

        if (atendimento == 'SIM') {
            const updateOrderService = await pool.query('UPDATE ordem_servicos SET inicio= CURRENT_TIMESTAMP, atendimento=($1),motivo_nao_atendimento=($2),status=($3),usuario_id=($4) WHERE id =($5) RETURNING *', [atendimento, motivo_nao_atendimento, 2, decoded.id, idOS])

        } else {
            console.log('aqui2')
            const updateOrderService = await pool.query('UPDATE ordem_servicos SET inicio= CURRENT_TIMESTAMP, atendimento=($1),motivo_nao_atendimento=($2),status=($3),usuario_id=($4) WHERE id =($5) RETURNING *', [atendimento, motivo_nao_atendimento, 3, decoded.id, idOS])
        }
        // console.log(updateOrderService.rows)
        /*   teste.map(async (nome, key) => {
             let  newImage = await pool.query('INSERT INTO registro_fotograficos (ordem_servico_id,diretorio) VALUES ($1,$2) RETURNING *', [req.body.id,nome.filename])
           }) */
        return res.status(200).send('sucesso')
        // return res.status(200).send( { image: `/uploads/${filename}` })

    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})


app.patch('/update_order_service_execute', checkToken, upload.single('imagem'), async (req, res) => {
    const { idOS, violacao, danos, efeito_falha, causa_falha, deteccao_falha, responsavel_falha, solucao, descricao_violacao } = req.body;
    const periferico = []
    const material_retirado = []
    const material_usado = []
    console.log()
    req.body.material_retirado.map((id) => { material_retirado.push(id.value) })
    req.body.material_usado.map((id) => { material_usado.push(id.value) })
    req.body.periferico.map((id) => { periferico.push(id.value) })

    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);

    try {
        const getOrderService = await pool.query('SELECT id,servico_id FROM ordem_servicos WHERE id =($1)', [idOS])
        const getService = await pool.query('SELECT cliente_id FROM servicos WHERE id =($1)', [getOrderService.rows[0].servico_id])
        const getUser = await pool.query('SELECT * FROM usuarios WHERE cliente_id =($1) AND tipo=($2) LIMIT 1', [getService.rows[0].cliente_id, 'GESTOR'])

        if (decoded.tipo == 'TERCEIRO') {
            if (material_usado) {
                material_usado.map(async (usado, key) => {
                    let updateEquipment = await pool.query('UPDATE equipamentos SET status=($1), usuario_id=($2), cliente_id=($3) WHERE id =($4) RETURNING *', ['2', getUser.rows[0].id, getService.rows[0].cliente_id, usado])
                    let newMovement = await pool.query('INSERT INTO movimento_equipamentos (equipamento_id,cliente_id_saiu,usuario_id_saiu,cliente_id_entrou,usuario_id_entrou,motivo) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [usado, getService.rows[0].cliente_id, getUser.rows[0].id, getService.rows[0].cliente_id, getUser.rows[0].id, 'UTILIZADO EM CAMPO (TÉC. TERCEIRO)'])
                })
            }
            if (material_retirado) {
                material_retirado.map(async (retirado, key) => {
                    let updateEquipment = await pool.query('UPDATE equipamentos SET status=($1), usuario_id=($2), cliente_id=($3) WHERE id =($4) RETURNING *', ['1', getUser.rows[0].id, getService.rows[0].cliente_id, retirado])
                    console.log(updateEquipment.rows)
                    let newMovement = await pool.query('INSERT INTO movimento_equipamentos (equipamento_id,cliente_id_saiu,usuario_id_saiu,cliente_id_entrou,usuario_id_entrou,motivo) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [retirado, getService.rows[0].cliente_id, getUser.rows[0].id, decoded.cliente, decoded.id, 'RECOLHIDO EM CAMPO (TÉC. TERCEIRO)'])
                })
            }
            if (periferico) {
                if (getOrderService.rows[0] != "INSTALACAO") {
                    periferico.map(async (item, key) => {
                        const getInsumo = await pool.query('SELECT valor, item FROM insumos WHERE id =($1)', [item])
                        const newTicket = await pool.query('INSERT INTO faturamentos(usuario_id,servico_id,ordem_servico_id, cliente_id,tipo,setor,descricao, quantidade, unidade,valor,observacao) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *', [decoded.id, getOrderService.rows[0].servico_id, idOS, getService.rows[0].cliente_id, 'MATERIAIS', decoded.setor, getInsumo.rows[0].item, '1', 'UN', getInsumo.rows[0].valor, 'REFERENTE EXECUÇÃO OS: ' + getOrderService.rows[0].id])
                    })
                }
            }
            if (danos == 'IRREPARAVEL') {
                const newInjury = await pool.query('INSERT INTO dano_equipamentos(usuario_id,servico_id,ordem_servico_id,cliente_id, equipamento_id) VALUES ($1,$2,$3,$4,$5) RETURNING *', [decoded.id, getOrderService.rows[0].servico_id, idOS, getService.rows[0].cliente_id, descricao_violacao])
            }
        } else {
            if (material_usado) {
                material_usado.map(async (usado, key) => {
                    let updateEquipment = await pool.query('UPDATE equipamentos SET status=($1), usuario_id=($2), cliente_id=($3) WHERE id =($4) RETURNING *', ['2', getUser.rows[0].id, getService.rows[0].cliente_id, usado])
                    let newMovement = await pool.query('INSERT INTO movimento_equipamentos (equipamento_id,cliente_id_saiu,usuario_id_saiu,cliente_id_entrou,usuario_id_entrou,motivo) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [usado, decoded.cliente, decoded.id, getService.rows[0].cliente_id, getUser.rows[0].id, 'UTILIZADO EM CAMPO'])
                    //const getInsumo = await pool.query('SELECT valor,item FROM insumos WHERE item =($1)', [updateEquipment.rows[0].tipo])
                    //const newTicket = await pool.query('INSERT INTO faturamentos(usuario_id,servico_id,ordem_servico_id, cliente_id,tipo,setor,descricao, quantidade, unidade,valor,observacao) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *', [decoded.id, getOrderService.rows[0].servico_id, idOS, getService.rows[0].cliente_id, 'MATERIAIS', decoded.setor, getInsumo.rows[0].item, '1', 'UN', getInsumo.rows[0].valor, 'REFERENTE EXECUÇÃO OS: ' + getOrderService.rows[0].id])
                })
            }
            if (material_retirado) {
                material_retirado.map(async (retirado, key) => {
                    let updateEquipment = await pool.query('UPDATE equipamentos SET status=($1), usuario_id=($2), cliente_id=($3) WHERE id =($4) RETURNING *', ['1', decoded.id, decoded.cliente, retirado])
                    console.log(updateEquipment.rows)
                    let newMovement = await pool.query('INSERT INTO movimento_equipamentos (equipamento_id,cliente_id_saiu,usuario_id_saiu,cliente_id_entrou,usuario_id_entrou,motivo) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [retirado, getService.rows[0].cliente_id, getUser.rows[0].id, decoded.cliente, decoded.id, 'RECOLHIDO EM CAMPO'])
                })
            }
            if (periferico) {
                if (getOrderService.rows[0] != "INSTALACAO") {
                    periferico.map(async (item, key) => {
                        const getInsumo = await pool.query('SELECT valor, item FROM insumos WHERE id =($1)', [item])
                        const newTicket = await pool.query('INSERT INTO faturamentos(usuario_id,servico_id,ordem_servico_id, cliente_id,tipo,setor,descricao, quantidade, unidade,valor,observacao) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *', [decoded.id, getOrderService.rows[0].servico_id, idOS, getService.rows[0].cliente_id, 'MATERIAIS', decoded.setor, getInsumo.rows[0].item, '1', 'UN', getInsumo.rows[0].valor, 'REFERENTE EXECUÇÃO OS: ' + getOrderService.rows[0].id])
                    })
                }
            }
            if (danos == 'IRREPARAVEL') {
                const newInjury = await pool.query('INSERT INTO dano_equipamentos(usuario_id,servico_id,ordem_servico_id,cliente_id, equipamento_id) VALUES ($1,$2,$3,$4,$5) RETURNING *', [decoded.id, getOrderService.rows[0].servico_id, idOS, getService.rows[0].cliente_id, descricao_violacao])
            }
        }

        const updateOrderService = await pool.query('UPDATE ordem_servicos SET termino=CURRENT_TIMESTAMP,violacao=($1),danos=($2),descricao_violacao=($3),material_retirado=($4),material_usado=($5), periferico=($6),solucao=($7), status=($8),efeito_falha=($9),causa_falha=($10),deteccao_falha=($11),responsavel_falha=($12),usuario_id=($13)  WHERE id =($14) RETURNING *', [violacao, danos, descricao_violacao, material_retirado, material_usado, periferico, solucao, '3', efeito_falha, causa_falha, deteccao_falha, responsavel_falha, decoded.id, idOS])

        const updateOrderService2 = await pool.query('UPDATE ordem_servicos SET duracao=(termino-inicio) WHERE id =($1) RETURNING *', [idOS])
        return res.status(200).json({ msg: "OS e estoques atualizados" })
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }

})
app.patch('/update_order_service_assignature', checkToken, checkVisit, async (req, res) => {
    const { idOS, assinatura } = req.body;
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    try {
        const updateOrderService = await pool.query('UPDATE ordem_servicos SET assinatura=($1), status=($2) WHERE id =($3) RETURNING *', [assinatura, '4', idOS])
        const getService = await pool.query('SELECT cliente_id FROM servicos WHERE id =($1)', [updateOrderService.rows[0].servico_id])
        const getClient = await pool.query('SELECT * FROM clientes WHERE id =($1)', [getService.rows[0].cliente_id])
        const getVehicle = await pool.query('SELECT * FROM veiculos WHERE id =($1)', [updateOrderService.rows[0].veiculo_id])

        if (updateOrderService.rows[0].atendimento == 'NAO') {
            const newTicket = await pool.query('INSERT INTO faturamentos(usuario_id,servico_id,ordem_servico_id, cliente_id,tipo,setor,descricao, quantidade, unidade,valor,observacao) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *', [decoded.id, updateOrderService.rows[0].servico_id, idOS, getService.rows[0].cliente_id, 'ADICIONAL', decoded.setor, 'ATENDIMENTO FRUSTADO', '1', 'UN', getClient.rows[0].valor_atendimento_frustado, updateOrderService.rows[0].motivo_nao_atendimento + " VEICULO PLACA " + getVehicle.rows[0].placa + "/ " + getVehicle.rows[0].frota])
        }
        if (updateOrderService.rows[0].violacao == 'SIM') {
            const newTicket = await pool.query('INSERT INTO faturamentos(usuario_id,servico_id,ordem_servico_id, cliente_id,tipo,setor,descricao, quantidade, unidade,valor,observacao) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *', [decoded.id, updateOrderService.rows[0].servico_id, idOS, getService.rows[0].cliente_id, 'SERVICO', decoded.setor, 'VIOLAÇÃO', '1', 'UN', getClient.rows[0].valor_violacao, updateOrderService.rows[0].descricao_violacao + " VEICULO PLACA " + getVehicle.rows[0].placa + "/ " + getVehicle.rows[0].frota])
        }
        if (updateOrderService.rows[0].atendimento == 'SIM') {
            if (updateOrderService.rows[0].tipo == 'INSTALACAO') {
                if (getVehicle.rows[0].tipo == 'LEVE') {
                    const newTicket = await pool.query('INSERT INTO faturamentos(usuario_id,servico_id,ordem_servico_id, cliente_id,tipo,setor,descricao, quantidade, unidade,valor,observacao) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *', [decoded.id, updateOrderService.rows[0].servico_id, idOS, getService.rows[0].cliente_id, 'SERVICO', decoded.setor, 'INSTALAÇÃO FROTA LEVE', '1', 'UN', getClient.rows[0].valor_instalacao_leve, 'FROTA ' + getVehicle.rows[0].tipo + " VEICULO PLACA " + getVehicle.rows[0].placa + "/ " + getVehicle.rows[0].frota])
                }
                if (getVehicle.rows[0].tipo == 'PESADO') {
                    const newTicket = await pool.query('INSERT INTO faturamentos(usuario_id,servico_id,ordem_servico_id, cliente_id,tipo,setor,descricao, quantidade, unidade,valor,observacao) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *', [decoded.id, updateOrderService.rows[0].servico_id, idOS, getService.rows[0].cliente_id, 'SERVICO', decoded.setor, 'INSTALAÇÃO FROTA PESADA', '1', 'UN', getClient.rows[0].valor_instalacao_pesada, 'FROTA ' + getVehicle.rows[0].tipo + " VEICULO PLACA " + getVehicle.rows[0].placa + "/ " + getVehicle.rows[0].frota])
                }
            }
            if (updateOrderService.rows[0].tipo == 'REMOCAO') {
                if (getVehicle.rows[0].tipo == 'LEVE') {
                    const newTicket = await pool.query('INSERT INTO faturamentos(usuario_id,servico_id,ordem_servico_id, cliente_id,tipo,setor,descricao, quantidade, unidade,valor,observacao) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *', [decoded.id, updateOrderService.rows[0].servico_id, idOS, getService.rows[0].cliente_id, 'SERVICO', decoded.setor, 'REMOÇÃO FROTA LEVE', '1', 'UN', getClient.rows[0].valor_remocao_leve, 'FROTA ' + getVehicle.rows[0].tipo + " VEICULO PLACA " + getVehicle.rows[0].placa + "/ " + getVehicle.rows[0].frota])
                }
                if (getVehicle.rows[0].tipo == 'PESADO') {
                    const newTicket = await pool.query('INSERT INTO faturamentos(usuario_id,servico_id,ordem_servico_id, cliente_id,tipo,setor,descricao, quantidade, unidade,valor,observacao) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *', [decoded.id, updateOrderService.rows[0].servico_id, idOS, getService.rows[0].cliente_id, 'SERVICO', decoded.setor, 'REMOÇÃO FROTA PESADA', '1', 'UN', getClient.rows[0].valor_remocao_pesada, 'FROTA ' + getVehicle.rows[0].tipo + " VEICULO PLACA " + getVehicle.rows[0].placa + "/ " + getVehicle.rows[0].frota])
                }
            }
            if (updateOrderService.rows[0].tipo == 'SUBSTITUICAO') {
                if (getVehicle.rows[0].tipo == 'LEVE') {
                    const newTicket = await pool.query('INSERT INTO faturamentos(usuario_id,servico_id,ordem_servico_id, cliente_id,tipo,setor,descricao, quantidade, unidade,valor,observacao) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *', [decoded.id, updateOrderService.rows[0].servico_id, idOS, getService.rows[0].cliente_id, 'SERVICO', decoded.setor, 'SUBSTITUIÇÃO FROTA LEVE', '1', 'UN', getClient.rows[0].valor_substituicao_leve, 'FROTA ' + getVehicle.rows[0].tipo + " VEICULO PLACA " + getVehicle.rows[0].placa + "/ " + getVehicle.rows[0].frota])
                }
                if (getVehicle.rows[0].tipo == 'PESADO') {
                    const newTicket = await pool.query('INSERT INTO faturamentos(usuario_id,servico_id,ordem_servico_id, cliente_id,tipo,setor,descricao, quantidade, unidade,valor,observacao) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *', [decoded.id, updateOrderService.rows[0].servico_id, idOS, getService.rows[0].cliente_id, 'SERVICO', decoded.setor, 'SUBSTITUIÇÃO FROTA PESADA', '1', 'UN', getClient.rows[0].valor_substituicao_pesada, 'FROTA ' + getVehicle.rows[0].tipo + " VEICULO PLACA " + getVehicle.rows[0].placa + "/ " + getVehicle.rows[0].frota])
                }
            }
        }

        return res.status(200).send('ok')
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/ordem_service_show/:id', checkToken, async (req, res) => {
    const id = req.params.id
    try {
        const getOrderService = await pool.query("SELECT ordem_servicos.id,ordem_servicos.servico_id,ordem_servicos.usuario_id,ordem_servicos.veiculo_id,ordem_servicos.tipo,ordem_servicos.produto,to_char(ordem_servicos.inicio, 'DD/MM/YYYY') as inicio, to_char(ordem_servicos.termino, 'DD/MM/YYYY') as termino,ordem_servicos.duracao,ordem_servicos.atendimento, ordem_servicos.motivo_nao_atendimento,ordem_servicos.material_usado,ordem_servicos.material_retirado,ordem_servicos.periferico,ordem_servicos.efeito_falha,ordem_servicos.causa_falha,ordem_servicos.deteccao_falha,ordem_servicos.responsavel_falha,ordem_servicos.solucao,ordem_servicos.violacao,ordem_servicos.danos, ordem_servicos.descricao_violacao,ordem_servicos.veiculo_remocao_id,ordem_servicos.assinatura,ordem_servicos.status,to_char(ordem_servicos.data_registro, 'DD/MM/YYYY') as data_registro, veiculos.frota,veiculos.placa FROM ordem_servicos JOIN veiculos ON ordem_servicos.veiculo_id = veiculos.id JOIN usuarios ON ordem_servicos.usuario_id = usuarios.id WHERE ordem_servicos.id=($1)", [id])
        // const getEquipmentUsed = await pool.query('SELECT * FROM equipamentos where id in(' + getService.rows[0].material_usado.join(',') + ')', [])
        // const getEquipmentRemoved = await pool.query('SELECT * FROM equipamentos where id in(' + getService.rows[0].material_retirado.join(',') + ')', [])
        // const getInsumos = await pool.query('SELECT item FROM insumos where id in(' + getService.rows[0].periferico.join(',') + ')', [])
        //return res.json({ Service: getService.rows[0], EquipmentUsed: getEquipmentUsed})

        return res.status(200).send(getOrderService.rows[0])
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

//visitas ________________________________________________________________________________________________
app.post('/open_visite', checkToken, checkVisit, async (req, res) => {
    /*
       const { id } = req.body;
       const autHeader = req.headers['authorization']
       const tokenRecebido = autHeader && autHeader.split(" ")[1]
       const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
       const decoded = jwt.verify(tokenRecebido, secret);
       try {
           const getVisite = await pool.query('SELECT * FROM visitas WHERE usuario_id=($1) AND status=($2)', [decoded.id, 1])
          
           if (Object.keys(getVisite.rows).length <= 0) {
               if(decoded.tipo !='TECNICO'){
              
               }else{
                   const getService = await pool.query('SELECT turno,cliente_id FROM servicos WHERE id =($1)', [id])
                   const getClient = await pool.query('SELECT distancia,valor_hospedagem,valor_alimentacao FROM clientes WHERE id =($1)', [getService.rows[0].cliente_id])
                   const getFrota = await pool.query('SELECT placa,frota FROM frota_internas WHERE usuario_id=($1) AND status=($2)', [decoded.id, 2])
                  
                   const newvisite = await pool.query('INSERT INTO visitas (cliente_id,servico_id,usuario_id, inicio, turno, hospedagem,alimentacao, distancia, veiculo) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *', [getService.rows[0].cliente_id, id, decoded.id, today, getService.rows[0].turno, getClient.rows[0].valor_hospedagem > 0, getClient.rows[0].valor_alimentacao > 0, (getClient.rows[0].distancia) * 2,getFrota.rows[0]? getFrota.rows[0].placa + "/ " + getFrota.rows[0].frota:"Sem frota interna"])
                   
                   return res.status(200).send(newvisite.rows[0])
               }
           } else {
               
           }
   
       } catch (err) {
          
           return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
       }
       */
})
app.get('/open_visite', checkToken, async (req, res) => {
    try {
        const autHeader = req.headers['authorization']
        const tokenRecebido = autHeader && autHeader.split(" ")[1]
        const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
        const decoded = jwt.verify(tokenRecebido, secret);
        const getVisite = await pool.query('SELECT * FROM visitas WHERE usuario_id=($1) AND status=($2) ORDER BY id DESC LIMIT 1', [decoded.id, '1'])
        if ((getVisite.rows).length > 0) {
            res.status(200).send(getVisite.rows[0])
        } else {
            return res.status(200).json({ msg: "sem visita" })
        }
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_visite', checkToken, async (req, res) => {
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    if (decoded.tipo == 'TECNICO') {
        try {
            const getVisite = await pool.query("SELECT visitas.id,visitas.servico_id,visitas.usuario_id,visitas.cliente_id,to_char(visitas.inicio, 'DD/MM/YYYY HH24:MI') as inicio,visitas.termino,visitas.turno,visitas.hora_base,visitas.hospedagem,visitas.alimentacao,visitas.distancia,visitas.veiculo,visitas.ajuste,visitas.justificativa,visitas.status,clientes.nome as nomeCliente,CASE WHEN visitas.status = '1' THEN 'EM ABERTO' WHEN  visitas.status = '2' THEN 'FINALIZADO'  END status_descricao,CASE WHEN visitas.hospedagem = 'true' THEN 'SIM' WHEN  visitas.status = 'false' THEN 'NÃO'  END hospedagem_descricao,CASE WHEN visitas.alimentacao = 'true' THEN 'SIM' WHEN  visitas.alimentacao = 'false' THEN 'NÃO'  END alimentacao_descricao FROM visitas JOIN clientes ON visitas.cliente_id= clientes.id WHERE visitas.status =($1) AND visitas.usuario_id=($2)", ['1', decoded.id])
            console.log(getVisite.rows)
            res.status(200).send(getVisite.rows)
        } catch (err) {
            return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
        }
    } else {
        try {
            const getVisite = await pool.query("SELECT visitas.id,visitas.servico_id,visitas.usuario_id,visitas.cliente_id,to_char(visitas.inicio, 'DD/MM/YYYY HH24:MI') as inicio,visitas.termino,visitas.turno,visitas.hora_base,visitas.hospedagem,visitas.alimentacao,visitas.distancia,visitas.veiculo,visitas.ajuste,visitas.justificativa,visitas.status,clientes.nome as nomeCliente,CASE WHEN visitas.status = '1' THEN 'EM ABERTO' WHEN  visitas.status = '2' THEN 'FINALIZADO'  END status_descricao,CASE WHEN visitas.hospedagem = 'true' THEN 'SIM' WHEN  visitas.status = 'false' THEN 'NÃO'  END hospedagem_descricao,CASE WHEN visitas.alimentacao = 'true' THEN 'SIM' WHEN  visitas.alimentacao = 'false' THEN 'NÃO'  END alimentacao_descricao FROM visitas JOIN clientes ON visitas.cliente_id= clientes.id WHERE visitas.status =($1)", ['1'])
            console.log(getVisite.rows)
            res.status(200).send(getVisite.rows)
        } catch (err) {
            return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
        }
    }
})
app.patch('/closed_visite', checkToken, checkOccurrence, closedVisite, async (req, res) => {
    return res.status(200).send('Visita finalizada')
})
app.patch('/visit_justification', checkToken, async (req, res) => {
    const { id, justificativa } = req.body;

    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    try {
        return res.status(200).send('deu certo')
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.get('/visite_show/:id', checkToken, async (req, res) => {
    id = req.params.id
    try {
        const getVisit = await pool.query('SELECT * FROM visitas JOIN usuarios on visitas.usuario_id = usuarios.id WHERE visitas.id=($1)', [id])
        res.status(200).send(getVisit.rows[0])
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
//ociosidade ________________________________________________________________________________________________
app.post('/open_occurrence', checkToken, async (req, res) => {
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    const today = new Date();
    today.setHours(today.getHours() - 3);
    try {
        const getVisite = await pool.query('SELECT * FROM visitas WHERE usuario_id=($1) AND status=($2) ORDER BY id DESC LIMIT 1', [decoded.id, '1'])
        console.log(getVisite.rows)
        const newOccurrence = await pool.query('INSERT INTO ociosidade (servico_id,cliente_id, usuario_id,visita_id,inicio) VALUES ($1,$2,$3,$4,$5) RETURNING *', [getVisite.rows[0].servico_id, getVisite.rows[0].cliente_id, decoded.id, getVisite.rows[0].id, today])
        //
        res.status(200).send(newOccurrence.rows[0])
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/open_occurrence', checkToken, async (req, res) => {
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    try {
        const getOccourence = await pool.query('SELECT * FROM ociosidade WHERE usuario_id=($1) AND status=($2) ORDER BY id DESC LIMIT 1', [decoded.id, '1'])
        if ((getOccourence.rows).length > 0) {
            res.status(200).send(getOccourence.rows[0])
        }
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.patch('/closed_occurrence', checkToken, checkOccurrence, async (req, res) => {

    res.status(200).send('deu certo')
})
//ticket ________________________________________________________________________________________________
app.get('/list_ticket_accept', checkToken, async (req, res) => {
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    try {
        const getFleet = await pool.query("SELECT faturamentos.id,faturamentos.tipo,faturamentos.descricao, to_char(faturamentos.data_registro, 'DD/MM/YYYY') as data_registro,faturamentos.setor, clientes.nome as nome_cliente FROM faturamentos JOIN clientes ON faturamentos.cliente_id = clientes.id  WHERE faturamentos.status=($1) AND faturamentos.retorno=($2) ORDER BY faturamentos.id ASC", ['1', 'false'])

        return res.status(200).send(getFleet.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_ticket_return', checkToken, async (req, res) => {
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    try {
        const getFleet = await pool.query("SELECT faturamentos.id,faturamentos.tipo,faturamentos.descricao, to_char(faturamentos.data_registro, 'DD/MM/YYYY') as data_registro,faturamentos.setor, clientes.nome as nome_cliente FROM faturamentos JOIN clientes ON faturamentos.cliente_id = clientes.id  WHERE faturamentos.status=($1) AND faturamentos.retorno=($2) AND faturamentos.setor=($3) ORDER BY faturamentos.id ASC", ['1', 'true', decoded.setor])

        return res.status(200).send(getFleet.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.patch('/update_ticket', checkToken, async (req, res) => {
    const { id, valor } = req.body;
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    try {
        const updateTicket = await pool.query('UPDATE faturamentos SET valor=($1),status=($2) where id=($3)', [valor.replace('.', '').replace(',', '.'), '2', id])
        let newMovement = await pool.query('INSERT INTO movimento_faturamentos (usuario_id,faturamento_id, motivo) VALUES ($1,$2,$3) RETURNING *', [decoded.id, id, 'APROVADO COM ALTERAÇÃO DO VALOR TOTAL'])
        return res.status(200).send(updateTicket.rows[0])
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.post('/accept_ticket', checkToken, async (req, res) => {
    const { faturamento_id } = req.body
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    const today = new Date();
    today.setHours(today.getHours() - 3);
    try {
        faturamento_id.map(async (ticket, key) => {
            let updateticket = await pool.query('UPDATE faturamentos SET status=($1),data_liberacao=($2) WHERE id =($3) RETURNING *', ['2', today, ticket])
            let newMovement = await pool.query('INSERT INTO movimento_faturamentos (usuario_id,faturamento_id, motivo) VALUES ($1,$2,$3) RETURNING *', [decoded.id, ticket, 'APROVADO PELO EMISSIOR'])
        })
        return res.status(200).send()
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.post('/refuse_ticket', checkToken, async (req, res) => {
    const { faturamento_id } = req.body
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    const today = new Date();
    today.setHours(today.getHours() - 3);
    try {
        faturamento_id.map(async (ticket, key) => {
            let updatetickey = await pool.query('UPDATE faturamentos SET status=($1),data_liberacao=($2) WHERE id =($3) RETURNING *', ['0', today, ticket])
            let newMovement = await pool.query('INSERT INTO movimento_faturamentos (usuario_id,faturamento_id, motivo) VALUES ($1,$2,$3) RETURNING *', [decoded.id, ticket, 'REPROVADO PELO EMISSIOR'])
        })
        return res.status(200).send()
    } catch (err) {


        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.post('/refuse_ticket_2', checkToken, async (req, res) => {
    const { faturamento_id } = req.body
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    const today = new Date();
    today.setHours(today.getHours() - 3);
    try {
        faturamento_id.map(async (ticket, key) => {
            let updatetickey = await pool.query('UPDATE faturamentos SET status=($1),data_liberacao=($2) WHERE id =($3) RETURNING *', ['0', today, ticket])
            let newMovement = await pool.query('INSERT INTO movimento_faturamentos (usuario_id,faturamento_id, motivo) VALUES ($1,$2,$3) RETURNING *', [decoded.id, ticket, 'CANCELADO PELO SETOR DE FATURAMENTO'])
        })
        return res.status(200).send()
    } catch (err) {


        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_ticket_consolidated', checkToken, async (req, res) => {

    try {
        const getTicket = await pool.query('SELECT faturamentos.cliente_id, COUNT(*),clientes.nome FROM faturamentos INNER  JOIN clientes ON faturamentos.cliente_id = clientes.id WHERE faturamentos.status=($1) GROUP BY  faturamentos.cliente_id,clientes.nome ', ['2'])
        return res.status(200).send(getTicket.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/ticket/consolidated/:id', checkToken, async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const getTicket = await pool.query("SELECT faturamentos.id, faturamentos.retorno,faturamentos.servico_id,faturamentos.usuario_id,faturamentos.ordem_servico_id,faturamentos.cliente_id,faturamentos.tipo,faturamentos.setor,faturamentos.quantidade,faturamentos.unidade,faturamentos.descricao,faturamentos.valor,faturamentos.observacao,to_char(faturamentos.data_liberacao, 'DD/MM/YYYY') as data_liberacao,faturamentos.status,faturamentos.data_registro, clientes.nome as nome_cliente FROM faturamentos  JOIN clientes ON faturamentos.cliente_id = clientes.id  WHERE faturamentos.status=($1) AND faturamentos.cliente_id=($2) ORDER BY ID ASC", ['2', id])
        return res.status(200).send(getTicket.rows)
    } catch (err) {
        console.log("erro")

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.post('/create_ticket', checkToken, async (req, res) => {
    const { cliente_id, faturamento_id } = req.body
    console.log(cliente_id)
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    try {
        const newTicket = await pool.query('INSERT INTO faturamento_gerados (cliente_id,faturamento_id) VALUES ($1,$2) RETURNING *', [cliente_id, faturamento_id])
        faturamento_id.map(async (ticket, key) => {
            let updateTicket = await pool.query('UPDATE faturamentos SET status=($1) WHERE id =($2) RETURNING *', ['3', ticket])
            let newMovement = await pool.query('INSERT INTO movimento_faturamentos (usuario_id,faturamento_id, motivo) VALUES ($1,$2,$3) RETURNING *', [decoded.id, ticket, 'VINCULADA A FATURA ' + newTicket.rows[0].id])

        })
        return res.status(200).send()
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_ticket_open', checkToken, async (req, res) => {
    try {
        const getTicket = await pool.query("SELECT faturamento_gerados.id,faturamento_gerados.faturamento_id,to_char(faturamento_gerados.data_registro, 'DD/MM/YYYY') as data_registro, clientes.nome FROM faturamento_gerados JOIN clientes ON faturamento_gerados.cliente_id = clientes.id WHERE faturamento_gerados.status=($1) ORDER BY ID ASC", ['1'])

        return res.status(200).send(getTicket.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/ticket_show/:id', checkToken, async (req, res) => {
    const id = req.params.id
    try {
        const getTicket = await pool.query('SELECT * FROM faturamentos WHERE id=($1)', [id])
        return res.status(200).send(getTicket.rows[0])
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/ticket_extract/:id', checkToken, async (req, res) => {
    const id = req.params.id
    try {
        const getTicketConsolited = await pool.query('SELECT cliente_id,faturamento_id FROM faturamento_gerados WHERE id=($1)', [id])
        const getClient = await pool.query('SELECT * FROM clientes WHERE id=($1)', [getTicketConsolited.rows[0].cliente_id])
        const getContract = await pool.query('SELECT * FROM contratos WHERE id=($1)', [getClient.rows[0].contrato_id])
        const getTickets = await pool.query("SELECT faturamentos.id,faturamentos.servico_id,faturamentos.ordem_servico_id,faturamentos.hardware_ordem_servico_id,faturamentos.visita_id,faturamentos.tipo,faturamentos.setor,faturamentos.valor,faturamentos.observacao,faturamentos.descricao, to_char(faturamentos.data_registro, 'DD/MM/YYYY') as data_registro,faturamentos.quantidade FROM faturamentos where id in(" + getTicketConsolited.rows[0].faturamento_id.join(',') + ")", [])
        const getSum = await pool.query('SELECT SUM(valor) FROM faturamentos where id in(' + getTicketConsolited.rows[0].faturamento_id.join(',') + ')', [])
        //const teste = await pool.query("SELECT TO_CHAR(data_registro,'DD-MM-YYYY') as data FROM faturamentos where id=1")
        console.log(getTickets.rows)
        return res.json({ client: getClient.rows[0], contract: getContract.rows[0], tickets: getTickets.rows, sum: getSum.rows[0] })
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.patch('/ticket_confirm', checkToken, async (req, res) => {
    const { id } = req.body
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    const today = new Date();
    today.setHours(today.getHours() - 3);
    try {
        const updateTicket = await pool.query('UPDATE faturamento_gerados SET status=($1),data_finalizado=($2) WHERE id =($3) RETURNING *', ['2', today, id])

        updateTicket.rows[0].faturamento_id.map(async (ticket, key) => {
            let update = await pool.query('UPDATE faturamentos SET status=($1),data_faturamento=($2) WHERE id =($3) RETURNING *', ['4', today, ticket])
            let newMovement = await pool.query('INSERT INTO movimento_faturamentos (usuario_id,faturamento_id, motivo) VALUES ($1,$2,$3) RETURNING *', [decoded.id, ticket, 'RECEBIDO NA FATURA ' + updateTicket.rows[0].id])
        })
        return res.status(200).send(updateTicket)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.patch('/ticket_cancel', checkToken, async (req, res) => {
    const { id, motivo } = req.body
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    console.log(id, motivo)
    const today = new Date();
    today.setHours(today.getHours() - 3);
    try {
        const updateticket = await pool.query('UPDATE faturamentos SET status=($1),cancelado=($2) WHERE id =($3) RETURNING *', ['0', motivo, id])
        const newMovement = await pool.query('INSERT INTO movimento_faturamentos (usuario_id,faturamento_id, motivo) VALUES ($1,$2,$3) RETURNING *', [decoded.id, id, 'CANCELADO PELO SETOR DE FATURAMENTO: ' + motivo])

        return res.status(200).json({ msg: "Ticket cancelado" })
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.patch('/ticket_return', checkToken, async (req, res) => {
    const { id, motivo } = req.body
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    try {
        const updateTicket = await pool.query('UPDATE  faturamentos SET status=($1),retorno=($2) WHERE id =($3) RETURNING *', ['1', 'true', id])
        let newMovement = await pool.query('INSERT INTO movimento_faturamentos (usuario_id,faturamento_id, motivo) VALUES ($1,$2,$3) RETURNING *', [decoded.id, id, 'DEVOLVIDO AO EMISSOR :' + motivo])

        return res.status(200).send(updateTicket)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.patch('/ticket_reaccept', checkToken, async (req, res) => {
    const { id, motivo } = req.body
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    try {
        const updateTicket = await pool.query('UPDATE  faturamentos SET status=($1) WHERE id =($2) RETURNING *', ['2', id])
        let newMovement = await pool.query('INSERT INTO movimento_faturamentos (usuario_id,faturamento_id, motivo) VALUES ($1,$2,$3) RETURNING *', [decoded.id, id, 'REAPROVADO PELO EMISSOR :' + motivo])

        return res.status(200).send(updateTicket)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_movement_ticket/:id', checkToken, async (req, res) => {
    const id = req.params.id
    try {
        const getMovement = await pool.query("SELECT movimento_faturamentos.motivo, to_char(movimento_faturamentos.data_registro, 'DD/MM/YYYY') as data_registro, usuarios.nome FROM movimento_faturamentos JOIN usuarios ON movimento_faturamentos.usuario_id = usuarios.id WHERE movimento_faturamentos.faturamento_id=($1) ORDER BY movimento_faturamentos.id ASC", [id])
        return res.status(200).send(getMovement.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})


app.patch('/extract_cancel', checkToken, async (req, res) => {
    const { id, motivo } = req.body
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    const today = new Date();
    today.setHours(today.getHours() - 3);
    console.log(id, motivo)

    try {
        const updateTicket = await pool.query('UPDATE faturamento_gerados SET status=($1),data_finalizado=($2),motivo_cancelamento=($3) WHERE id =($4) RETURNING *', ['0', today, motivo, id])
        updateTicket.rows[0].faturamento_id.map(async (ticket, key) => {
            let update = await pool.query('UPDATE faturamentos SET status=($1) WHERE id=($2) RETURNING *', ['2', ticket])
            let newMovement = await pool.query('INSERT INTO movimento_faturamentos (usuario_id,faturamento_id, motivo) VALUES ($1,$2,$3) RETURNING *', [decoded.id, ticket, 'CANCELAMENTO DA FATURA ' + updateTicket.rows[0].id])
        })
        return res.status(200).json({ msg: "Ticket cancelado" })
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }

})
//historico ________________________________________________________________________________________________
app.get('/history/ticket/:inicio/:fim', checkToken, async (req, res) => {
    const inicio = req.params.inicio
    const fim = req.params.fim

    try {
        const getTickets = await pool.query("SELECT faturamentos.id,faturamentos.servico_id,faturamentos.usuario_id,faturamentos.ordem_servico_id,faturamentos.cliente_id,faturamentos.tipo,faturamentos.setor,faturamentos.quantidade,faturamentos.unidade,faturamentos.descricao,faturamentos.valor,faturamentos.observacao,to_char(faturamentos.data_liberacao, 'DD/MM/YYYY') as data_liberacao,to_char(faturamentos.data_faturamento, 'DD/MM/YYYY') as data_faturamento,faturamentos.status,to_char(faturamentos.data_registro, 'DD/MM/YYYY') as data_registro, clientes.nome,CASE WHEN faturamentos.status = '1' THEN 'AGUARDANDO APROVAÇÃO' WHEN  faturamentos.status = '2' THEN 'DISPONÍVEL PARA FATURAMENTO' WHEN faturamentos.status = '3' THEN 'LISTADO EM FATURA' WHEN faturamentos.status = '4' THEN 'FATURADO' END status_descricao FROM faturamentos JOIN clientes ON faturamentos.cliente_id = clientes.id WHERE faturamentos.status!=($1) AND faturamentos.data_registro BETWEEN ($2) AND ($3) ORDER BY faturamentos.id ASC", [0, inicio, fim])

        return res.status(200).send(getTickets.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/history/service/:inicio/:fim', checkToken, async (req, res) => {
    const inicio = req.params.inicio
    const fim = req.params.fim
    try {
        const getServices = await pool.query("SELECT ordem_servicos.id,ordem_servicos.servico_id,ordem_servicos.usuario_id,ordem_servicos.veiculo_id,ordem_servicos.tipo,ordem_servicos.produto,ordem_servicos.inicio,ordem_servicos.termino,ordem_servicos.duracao,ordem_servicos.atendimento,ordem_servicos.motivo_nao_atendimento,ordem_servicos.material_usado,ordem_servicos.material_retirado,ordem_servicos.periferico,ordem_servicos.efeito_falha,ordem_servicos.causa_falha,ordem_servicos.deteccao_falha,ordem_servicos.responsavel_falha,ordem_servicos.solucao,ordem_servicos.violacao,ordem_servicos.danos,ordem_servicos.descricao_violacao,ordem_servicos.status,to_char(ordem_servicos.data_registro, 'DD/MM/YYYY') as data_registro,servicos.chamado,servicos.cliente_id,clientes.nome as nomecliente,veiculos.placa,veiculos.frota,usuarios.nome as nomeusuario,CASE WHEN ordem_servicos.status = '1' THEN 'EM ABERTO' WHEN  ordem_servicos.status = '2' THEN 'AVALIADO' WHEN  ordem_servicos.status = '3' THEN 'EXECUTADO' WHEN  ordem_servicos.status = '4' THEN 'FINALIZADO' END status_descricao  FROM ordem_servicos JOIN servicos ON ordem_servicos.servico_id= servicos.id JOIN clientes ON servicos.cliente_id= clientes.id JOIN veiculos ON ordem_servicos.veiculo_id= veiculos.id JOIN usuarios ON ordem_servicos.usuario_id= usuarios.id WHERE ordem_servicos.status !=($1) AND ordem_servicos.data_registro BETWEEN ($2) AND ($3) ORDER BY ordem_servicos.id ASC", ['0', inicio, fim])
        return res.status(200).send(getServices.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/history/visite/:inicio/:fim', checkToken, async (req, res) => {
    const inicio = req.params.inicio
    const fim = req.params.fim
    try {
        const getVisite = await pool.query("SELECT visitas.id,visitas.servico_id,visitas.usuario_id,visitas.cliente_id,visitas.inicio,visitas.termino,visitas.turno,visitas.hora_base,visitas.hospedagem,visitas.alimentacao,visitas.distancia,visitas.veiculo,visitas.ajuste,visitas.justificativa,visitas.status,usuarios.nome as nomeusuario,CASE WHEN visitas.status = '1' THEN 'EM ABERTO' WHEN  visitas.status = '2' THEN 'FINALIZADO'  END status_descricao,CASE WHEN visitas.hospedagem = 'true' THEN 'SIM' WHEN  visitas.status = 'false' THEN 'NÃO'  END hospedagem_descricao,CASE WHEN visitas.alimentacao = 'true' THEN 'SIM' WHEN  visitas.alimentacao = 'false' THEN 'NÃO'  END alimentacao_descricao    FROM visitas JOIN usuarios ON visitas.usuario_id= usuarios.id WHERE visitas.status !=($1) AND visitas.inicio BETWEEN ($2) AND ($3) ORDER BY visitas.id ASC", [0, inicio, fim])

        return res.status(200).send(getVisite.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
//frotas interna ________________________________________________________________________________________________
app.get('/list_internal_fleet_input', checkToken, async (req, res) => {
    try {
        const getFleet = await pool.query('SELECT id,placa,frota FROM frota_internas WHERE status=($1)', ['1'])
        return res.status(200).send(getFleet.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_internal_fleet', checkToken, async (req, res) => {
    try {
        const getFleet = await pool.query("SELECT frota_internas.id,frota_internas.frota, frota_internas.placa,frota_internas.usuario_id,frota_internas.status FROM frota_internas WHERE frota_internas.status !='0'")

        return res.status(200).send(getFleet.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.post('/create_internal_fleet', checkToken, async (req, res) => {
    const { placa, frota } = req.body;

    try {
        const newFleet = await pool.query('INSERT INTO frota_internas (placa,frota) VALUES ($1,$2) RETURNING *', [placa, frota])
        return res.status(200).send(newFleet.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.patch('/update_internal_fleet', checkToken, async (req, res) => {
    const { id, placa, frota, usuario_id } = req.body;
    let status = usuario_id ? '2' : '1';
    console.log(status)
    try {
        const updateIternalFleet = await pool.query('UPDATE frota_internas SET placa=($1), frota=($2), usuario_id=($3), status=($4) where id=($5) RETURNING *', [placa, frota, usuario_id, status, id])
        return res.status(200).json({ registro: updateIternalFleet.rows[0] })
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.patch('/transfer_internal_fleet', checkToken, async (req, res) => {
    const { id, usuario_id, kmAtual, farolBaixo, farolAlto, faroleteDianteiro, faroleteTraseiro, luzSeta, luzFreio, luzRe, freioMao, oleoMotor, oleoMotorValidade, liqArrefecimento, oleoFreio, retrovisor, plotagem, limpezaInterna, limpezaExterna, limpezaBanco, alarme, buzina, pneu, roda, estepe, vidro, palheta, tagPedagio, observacao, imagem, assinatura, tipo } = req.body;
    let status = usuario_id ? '2' : '1';
    try {
        const updateIternalFleet = await pool.query('UPDATE frota_internas SET usuario_id=($1), status=($2) where id=($3) RETURNING *', [usuario_id, status, id])
        const transferIternalFleet = await pool.query('INSERT INTO movimento_frota_internas(frota_interna_id,usuario_id,km_atual,farol_baixo,farol_alto,farolete_dianteiro,farolete_traseiro,luz_seta,luz_freio,luz_re,freio_mao,oleo_motor,oleo_motor_validade,liq_arrefecimento,oleo_freio,retrovisor,plotagem,limpeza_interna,limpeza_externa,limpeza_banco,alarme,buzina,pneu,roda,estepe,vidro,palheta,tag_pedagio,observacao,imagem,assinatura,tipo) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32) RETURNING *', [id, usuario_id, kmAtual, farolBaixo, farolAlto, faroleteDianteiro, faroleteTraseiro, luzSeta, luzFreio, luzRe, freioMao, oleoMotor, oleoMotorValidade, liqArrefecimento, oleoFreio, retrovisor, plotagem, limpezaInterna, limpezaExterna, limpezaBanco, alarme, buzina, pneu, roda, estepe, vidro, palheta, tagPedagio, observacao, imagem, assinatura, tipo])
    

        return res.status(200).json({ registro: transferIternalFleet.rows[0] })
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/show_transfer_internal_fleet/:id', checkToken, async (req, res) => {
    const id = req.params.id
    try {
        const transferIternalFleet = await pool.query("SELECT movimento_frota_internas.frota_interna_id,movimento_frota_internas.usuario_id,movimento_frota_internas.km_atual,movimento_frota_internas.farol_baixo,movimento_frota_internas.farol_alto,movimento_frota_internas.farolete_dianteiro,movimento_frota_internas.farolete_traseiro,movimento_frota_internas.luz_seta,movimento_frota_internas.luz_freio,movimento_frota_internas.luz_re,movimento_frota_internas.freio_mao,movimento_frota_internas.oleo_motor,movimento_frota_internas.oleo_motor_validade,movimento_frota_internas.liq_arrefecimento,movimento_frota_internas.oleo_freio,movimento_frota_internas.retrovisor,movimento_frota_internas.plotagem,movimento_frota_internas.limpeza_interna,movimento_frota_internas.limpeza_externa,movimento_frota_internas.limpeza_banco,movimento_frota_internas.alarme,movimento_frota_internas.buzina,movimento_frota_internas.pneu,movimento_frota_internas.roda,movimento_frota_internas.estepe,movimento_frota_internas.vidro,movimento_frota_internas.palheta,movimento_frota_internas.tag_pedagio,movimento_frota_internas.observacao,movimento_frota_internas.imagem,movimento_frota_internas.assinatura,movimento_frota_internas.tipo,to_char(movimento_frota_internas.created_at, 'DD/MM/YYYY') as data_registro  FROM movimento_frota_internas JOIN usuarios ON movimento_frota_internas.usuario_id = usuarios.id WHERE movimento_frota_internas.id=($1)", [id])
        return res.status(200).json({ registro: transferIternalFleet.rows[0] })
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/list_movement_Internal_fleet/:id', checkToken, async (req, res) => {
    const id = req.params.id

    try {
        const getMovement = await pool.query("SELECT movimento_frota_internas.id, movimento_frota_internas.km_atual,to_char(movimento_frota_internas.created_at, 'DD/MM/YYYY') as data_registro, usuarios.nome as nome_usuario FROM movimento_frota_internas JOIN usuarios ON movimento_frota_internas.usuario_id = usuarios.id WHERE movimento_frota_internas.frota_interna_id=($1)", [id])

        return res.status(200).send(getMovement.rows)
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/show_internal_fleet/:id', checkToken, async (req, res) => {
    const id = req.params.id
    try {
        const getVehicle = await pool.query('SELECT * FROM frota_internas WHERE id=($1)', [id])
        return res.status(200).send(getVehicle.rows[0])
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.get('/history/fuel/:id', checkToken, async (req, res) => {
    const id = req.params.id
    try {
        const getFuel = await pool.query("SELECT abastecimento_frota_internas.kmAtual,abastecimento_frota_internas.kmAnterior,to_char(abastecimento_frota_internas.data_registro, 'DD/MM/YYYY') as data_registro,abastecimento_frota_internas.quantidade,abastecimento_frota_internas.valor,abastecimento_frota_internas.tipoCombustivel, usuarios.nome as nome_usuario, frota_internas.frota,frota_iternas.placa FROM abastecimento_frota_internas JOIN usuarios ON abastecimento_frota_internas.usuario_id = usuarios.id JOIN frota_internas ON abastecimento_frota_internas.frota_interna_id = frota_internas.id WHERE abastecimento_frota_internass.frota_interna_id=($1)", [id])
        return res.status(200).send(getFuel.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.get('/history/fuel/:inicio/:fim', checkToken, async (req, res) => {
    const inicio = req.params.inicio
    const fim = req.params.fim
    try {
        const getFuel = await pool.query("SELECT abastecimento_frota_internas.kmAtual,abastecimento_frota_internas.kmAnterior,to_char(abastecimento_frota_internas.data_registro, 'DD/MM/YYYY') as data_registro,abastecimento_frota_internas.quantidade,abastecimento_frota_internas.valor,abastecimento_frota_internas.tipoCombustivel, usuarios.nome as nome_usuario, frota_internas.frota,frota_iternas.placa FROM abastecimento_frota_internas JOIN usuarios ON abastecimento_frota_internas.usuario_id = usuarios.id JOIN frota_internas ON abastecimento_frota_internas.frota_interna_id = frota_internas.id WHERE faturamentos.data_registro BETWEEN ($1) AND ($2) ORDER BY abastecimento_frota_internas.id ASC", [inicio, fim])
        return res.status(200).send(getFuel.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.post('/create_input', checkToken, async (req, res) => {
    const { item, tipo, valor } = req.body;

    try {
        const newInput = await pool.query('INSERT INTO insumos (item, tipo, valor) VALUES ($1,$2,$3) RETURNING *', [item, tipo, valor])
        return res.status(200).send(newInput.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})


//hardware _______________________________________________________________________________
app.get('/hardware/list_order_service/:object', checkToken, async (req, res) => {
    const array = (req.params.object).split(",");

    let ListOS = []
    let getOS = ''
    try {
        const getOS = await pool.query("select hardware_ordem_servicos.id,hardware_ordem_servicos.observacao_inspecao,equipamentos.tipo, equipamentos.numero_serie, equipamentos.identificador from hardware_ordem_servicos JOIN equipamentos ON hardware_ordem_servicos.equipamento_id = equipamentos.id where hardware_ordem_servicos.id = any($1)", [array])
        return res.status(200).send(getOS.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/hardware/list_order_service_inspection', checkToken, async (req, res) => {

    try {
        const getOS = await pool.query("select hardware_ordem_servicos.id, hardware_ordem_servicos.hardware_servicos_id, equipamentos.tipo, equipamentos.numero_serie from hardware_ordem_servicos JOIN equipamentos ON hardware_ordem_servicos.equipamento_id = equipamentos.id where hardware_ordem_servicos.status=($1)", [1])
        return res.status(200).send(getOS.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/hardware/list_order_service_maintenance', checkToken, async (req, res) => {

    try {
        const getOS = await pool.query("select hardware_ordem_servicos.id, hardware_ordem_servicos.hardware_servicos_id,  equipamentos.tipo, equipamentos.numero_serie from hardware_ordem_servicos JOIN equipamentos ON hardware_ordem_servicos.equipamento_id = equipamentos.id where hardware_ordem_servicos.status=($1)", [2])
        return res.status(200).send(getOS.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.patch('/update_wardware_order_service_inspecao', checkToken, async (req, res) => {
    const { inicio_inspecao, termino_inspecao, observacao_inspecao, id, switch_inspecao } = req.body;
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    console.log(req.body)
    try {
        const updateOS = await pool.query('UPDATE hardware_ordem_servicos SET inicio_inspecao=($1), termino_inspecao=($2), observacao_inspecao=($3), status=($4),usuario_id=($5) where id=($6) RETURNING*', [inicio_inspecao, termino_inspecao, observacao_inspecao, switch_inspecao == true ? 3 : 2, decoded.id, id])
        const getClient = await pool.query("SELECT cliente_id from hardware_servicos where id=($1)", [updateOS.rows[0].hardware_servicos_id])
        const getEquipment = await pool.query("SELECT tipo,numero_serie from equipamentos where id=($1)", [updateOS.rows[0].equipamento_id])
        const getTime = await pool.query("SELECT to_char(hardware_ordem_servicos.termino_inspecao - hardware_ordem_servicos.inicio_inspecao,'MI') AS minutos,to_char(hardware_ordem_servicos.termino_inspecao - hardware_ordem_servicos.inicio_inspecao,'HH24') AS horas FROM hardware_ordem_servicos WHERE ID=($1)", [id])
        console.log(getTime.rows[0])
        //horaTotal= inteiroPraCima((horas em minutos + minutos)/60)
        const minutosTotal = Number(getTime.rows[0].horas * 60) + Number(getTime.rows[0].minutos)
        if (minutosTotal > 0) {
            console.log('com cobrança')
              /*INSERIR MOVIMENTOS TICKETS*/    
            const newTicket = await pool.query('INSERT INTO faturamentos(hardware_ordem_servico_id,usuario_id,cliente_id,tipo,setor,descricao, quantidade, unidade,valor,observacao) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *', [id, decoded.id, getClient.rows[0].cliente_id, 'HARDWARE', 'HARDWARE', 'TEMPO INSPEÇÃO', minutosTotal, 'MINUTOS', minutosTotal * 0.33,'Equipamento SNº: ' +getEquipment.rows[0].numero_serie])
        } else {
            console.log('sem cobrança, tempo inferior a 1')
        }
        return res.status(200).json({ msg: "Finalizado, OS: " + id + " atualizada" })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.patch('/update_wardware_order_service_maintenance', checkToken, async (req, res) => {
    const { inicio_manutencao, termino_manutencao, observacao_manutencao, id, periferico_id, qdade_periferico_id } = req.body;
    const autHeader = req.headers['authorization']
    const tokenRecebido = autHeader && autHeader.split(" ")[1]
    const secret = "TRERDFGYGFCGFCVBNJKJKYJTGDVTYGTCEGDFGFH54E465F"
    const decoded = jwt.verify(tokenRecebido, secret);
    try {
        const updateOS = await pool.query('UPDATE hardware_ordem_servicos SET inicio_manutencao=($1), termino_manutenção=($2), observacao_manutencao=($3), status=($4),usuario_id=($5) where id=($6) RETURNING*', [inicio_manutencao, termino_manutencao, observacao_manutencao,3,decoded.id, id])
        const getClient = await pool.query("SELECT cliente_id from hardware_servicos where id=($1)", [updateOS.rows[0].hardware_servicos_id])
        const getEquipment = await pool.query("SELECT tipo,numero_serie from equipamentos where id=($1)", [updateOS.rows[0].equipamento_id])
        const getTime = await pool.query("SELECT to_char(hardware_ordem_servicos.termino_manutenção - hardware_ordem_servicos.inicio_manutencao,'MI') AS minutos,to_char(hardware_ordem_servicos.termino_manutenção - hardware_ordem_servicos.inicio_manutencao,'HH24') AS horas FROM hardware_ordem_servicos WHERE ID=($1)", [id])
        console.log(getTime.rows[0])
        //horaTotal= inteiroPraCima((horas em minutos + minutos)/60)
        const minutosTotal = Number(getTime.rows[0].horas * 60) + Number(getTime.rows[0].minutos)
        if (minutosTotal > 0) {
            console.log('com cobrança')
              /*INSERIR MOVIMENTOS TICKETS*/
            const newTicket = await pool.query('INSERT INTO faturamentos(hardware_ordem_servico_id,usuario_id,cliente_id,tipo,setor,descricao, quantidade, unidade,valor,observacao) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *', [id, decoded.id, getClient.rows[0].cliente_id, 'HARDWARE', 'HARDWARE', 'TEMPO MANUTENÇÃO', minutosTotal, 'MINUTOS', minutosTotal * 0.49,'Equipamento SNº: ' +getEquipment.rows[0].numero_serie])
            /*INSERIR CUSTOS DE COMPONENTES*/
        } else {
            console.log('sem cobrança, tempo inferior a 1')
        }
        return res.status(200).json({ msg: "Finalizado, OS: " + id + " atualizada" })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/hardeware/list_service', checkToken, async (req, res) => {

    try {
        const getService = await pool.query("SELECT hardware_servicos.id, hardware_servicos.cliente_id, hardware_servicos.status, to_char( hardware_servicos.created_at, 'DD/MM/YYYY') as data, clientes.nome FROM  hardware_servicos JOIN clientes ON  hardware_servicos.cliente_id = clientes.id WHERE  hardware_servicos.status=($1)", [1])
        return res.status(200).send(getService.rows)
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.get('/hardware/service_show/:id', checkToken, async (req, res) => {
    id = req.params.id
    try {
        const getService = await pool.query("SELECT hardware_servicos.id, hardware_servicos.cliente_id, hardware_servicos.status, to_char( hardware_servicos.created_at, 'DD/MM/YYYY') as data,hardware_servicos.cliente_id, clientes.nome FROM  hardware_servicos JOIN clientes ON  hardware_servicos.cliente_id = clientes.id WHERE  hardware_servicos.id=($1)", [id])
        const getOrderService = await pool.query("SELECT hardware_ordem_servicos.id,to_char(hardware_ordem_servicos.termino_inspecao - hardware_ordem_servicos.inicio_inspecao,'MI:SS'  ) AS duracao_inSpecao, to_char(hardware_ordem_servicos.termino_manutenção - hardware_ordem_servicos.inicio_manutencao,'MI:SS') AS duracao_manutencao, CASE WHEN hardware_ordem_servicos.status = '1' THEN 'AGUARDANDO INSPEÇÃO' WHEN hardware_ordem_servicos.status = '2' THEN 'AGUARDANDO MANUTENÇÃO' WHEN hardware_ordem_servicos.status = '3' THEN 'FINALIZADO' END status_descricao ,equipamentos.tipo, equipamentos.numero_serie  from hardware_ordem_servicos JOIN equipamentos ON hardware_ordem_servicos.equipamento_id= equipamentos.id WHERE hardware_ordem_servicos.hardware_servicos_id=($1) ORDER BY hardware_ordem_servicos.id ASC", [getService.rows[0].id])
        return res.json({ service: getService.rows[0], ordem_service: getOrderService.rows })
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})
app.get('/hardware/order_service_show/:id', checkToken, async (req, res) => {
    id = req.params.id
    try {
        const getOrderService = await pool.query("SELECT hardware_ordem_servicos.id,to_char(hardware_ordem_servicos.inicio_inspecao,'DD/MM/YYYY HH24:MI:SS') as inicio_inspecao, to_char(hardware_ordem_servicos.termino_inspecao,'DD/MM/YYYY HH24:MI:SS') AS termino_inspecao, to_char(hardware_ordem_servicos.inicio_manutencao,'DD/MM/YYYY HH24:MI:SS') as inicio_manutencao, to_char (hardware_ordem_servicos.termino_manutenção,'DD/MM/YYYY HH24:MI:SS') as termino_manutencao, hardware_ordem_servicos.observacao_manutencao,hardware_ordem_servicos.observacao_inspecao,to_char(hardware_ordem_servicos.termino_inspecao - hardware_ordem_servicos.inicio_inspecao,'MM:SS'  ) AS duracao_inSpecao, to_char(hardware_ordem_servicos.termino_manutenção - hardware_ordem_servicos.inicio_manutencao,'MM:SS') AS duracao_manutencao, CASE WHEN hardware_ordem_servicos.status = '1' THEN 'AGUARDANDO INSPEÇÃO' WHEN hardware_ordem_servicos.status = '2' THEN 'AGUARDANDO MANUTENÇÃO' WHEN hardware_ordem_servicos.status = '3' THEN 'FINALIZADO' END status_descricao ,equipamentos.tipo, equipamentos.numero_serie  from hardware_ordem_servicos JOIN equipamentos ON hardware_ordem_servicos.equipamento_id= equipamentos.id WHERE hardware_ordem_servicos.id=($1) ORDER BY hardware_ordem_servicos.id ASC", [id])
        console.log(getOrderService.rows)
        return res.status(200).send(getOrderService.rows[0])
    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.patch('/hardware/service/finalize/:id', checkToken, async (req, res) => {
    id = req.params.id
    const today = new Date();
    today.setHours(today.getHours() - 3);
    try {
        const getOrderService = await pool.query("SELECT hardware_ordem_servicos.id FROM hardware_ordem_servicos WHERE hardware_ordem_servicos.hardware_servicos_id=($1) AND status !=($2)", [id, '3'])
        if (getOrderService.rowCount > 0) {

            return res.status(200).json({ msg: "Finalize todas as OS!" })

        } else {
            const updateOS = await pool.query('UPDATE hardware_servicos SET status=($1), concluido=($2) WHERE ID=($3)', ['2', today, id])
            return res.status(200).json({ msg: "Finalizado!" })
        }

    } catch (err) {

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})



app.get('/hardware/history/service/:inicio/:fim', checkToken, async (req, res) => {
    const inicio = req.params.inicio
    const fim = req.params.fim
    try {
        const getServices = await pool.query("SELECT hardware_ordem_servicos.id,to_char(hardware_ordem_servicos.inicio_inspecao,'DD/MM/YYYY HH24:MI:SS') as inicio_inspecao, to_char(hardware_ordem_servicos.termino_inspecao,'DD/MM/YYYY HH24:MI:SS') AS termino_inspecao, to_char(hardware_ordem_servicos.inicio_manutencao,'DD/MM/YYYY HH24:MI:SS') as inicio_manutencao, to_char (hardware_ordem_servicos.termino_manutenção,'DD/MM/YYYY HH24:MI:SS') as termino_manutencao,to_char(hardware_ordem_servicos.termino_inspecao - hardware_ordem_servicos.inicio_inspecao,'MM:SS'  ) AS duracao_inSpecao, to_char(hardware_ordem_servicos.termino_manutenção - hardware_ordem_servicos.inicio_manutencao,'MM:SS') AS duracao_manutencao, CASE WHEN hardware_ordem_servicos.status = '1' THEN 'AGUARDANDO INSPEÇÃO' WHEN hardware_ordem_servicos.status = '2' THEN 'AGUARDANDO MANUTENÇÃO' WHEN hardware_ordem_servicos.status = '3' THEN 'FINALIZADO' END status_os,equipamentos.tipo, equipamentos.numero_serie, CASE WHEN hardware_servicos.status = '1' THEN 'EM ABERTO' WHEN hardware_servicos.status = '2' THEN 'FINALIZADO'  END status_servico ,to_char(hardware_servicos.concluido,'DD/MM/YYYY') as data_conclusao, clientes.nome FROM hardware_ordem_servicos JOIN equipamentos ON hardware_ordem_servicos.equipamento_id= equipamentos.id JOIN hardware_servicos ON hardware_ordem_servicos.hardware_servicos_id= hardware_servicos.id JOIN clientes ON hardware_servicos.cliente_id = clientes.id WHERE hardware_ordem_servicos.status !=($1) AND hardware_ordem_servicos.created_at BETWEEN ($2) AND ($3) ORDER BY hardware_ordem_servicos.id ASC", ['0', inicio, fim])

        return res.status(200).send(getServices.rows)
    } catch (err) {
        console.log(err)

        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.get('/hardware/list_cost_input', checkToken, async (req, res) => {
    try {
        const getInput = await pool.query('SELECT tipo,id, valor FROM hardware_custo_servicos')
        return res.status(200).send(getInput.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

//outros __________________________________________________________________
app.post('/create_equipment_movement', checkToken, async (req, res) => {
    const { equipamento_id, cliente_id_saiu, usuario_id_saiu, cliente_id_entrou, usuario_id_entrou, motivo, chamado } = req.body;

    try {
        const newMovement = await pool.query('INSERT INTO movimento_equipamentos (equipamento_id,cliente_id_saiu,usuario_id_saiu,cliente_id_entrou,usuario_id_entrou,motivo,chamado) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *', [equipamento_id, cliente_id_saiu, usuario_id_saiu, cliente_id_entrou, usuario_id_entrou, motivo, chamado])
        return res.status(200).send(newMovement.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})

app.get('/list_equipment_movement', checkToken, async (req, res) => {
    try {
        const getMovement = await pool.query("SELECT movimento_equipamentos.cliente_id_saiu,movimento_equipamentos.usuario_id_saiu,movimento_equipamentos.cliente_id_entrou,movimento_equipamentos.usuario_id_entrou,movimento_equipamentos.motivo,movimento_equipamentos.chamado,to_char(movimento_equipamentos.data_registro, 'DD/MM/YYYY') as data_registro,movimento_equipamentos.status, movimento_equipamentos.motivo, usuarios.nome as nome_usuario, clientes.nome as nome_cliente FROM movimento_equipamentos JOIN usuarios ON movimento_equipamentos.usuario_id_entrou = movimento_equipamentos.id JOIN clientes ON movimento_equipamentos.cliente_id_entrou = movimento_equipamentos.id WHERE movimento_equipamentos.id=($1)"['2'])
        return res.status(200).send(getMovement.rows)
    } catch (err) {
        return res.status(400).json({ msg: "Houve um erro na solicitação: " + err })
    }
})