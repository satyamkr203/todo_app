
import fs from 'fs';
import path from 'path';


export function getAllTodo(req, res) {
    fs.readFile("./temp/todo.json", "utf8", (err, data) => {
        if (err) {
            console.log(err.message);
            return res.status(404).json({
                msg: "couldn't read the file!"
            })
        } else {
            let todoData = JSON.parse(data);
            return res.status(200).json({
                msg: todoData
            })
        }
    })
}

export async function getTodoById(req, res) {
    // console.log(req.params.id);
    const todo_id = parseInt(req.params.id); // change id into interger values
    // console.log(todo_id);
    if (isNaN(todo_id)) {
        return res.status(404).json({
            msg: "invalid id format"
        })
    }
    try {
        fs.readFile('./temp/todo.json', "utf8", (err, data) => {
            if (err) {
                return res.status(404).json({
                    msg: "couldn't load the file "
                })
            } else {
                const todoData = JSON.parse(data);
                //console.log(typeof(todoData[0].id));
                //console.log(typeof(todo_id));
                // for(let i=0; i<todoData.length; i++){
                //     if(todoData[i].id === todo_id){
                //         return res.status(200).json({
                //             id:todoData[i].id,
                //             title:todoData[i].title,
                //             description:todoData[i].description,
                //             Completed:todoData[i].completed,
                //         })
                //     }
                // }

                // using array.find 
                const getData = todoData.find(todo => todo.id === todo_id);
                if (getData) {
                    return res.status(200).json({
                        title: getData.title,
                        description: getData.description,
                        completed: getData.completed,
                    })
                } else {
                    return res.status(404).json({
                        msg: "couldn't find the id"
                    })
                }
            }
        })
    } catch (err) {
        console.log(err);
        console.log(`getting error: ${err.message}`);
        return res.status(404).json({
            msg: "couldn't getting the error " + err.message
        })
    }
}



export function createTodo(req, res) {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(404).json({
            msg: "all field are required",
        })
    }
    try {
        fs.readFile('./temp/todo.json', "utf8", (err, data) => {
            if (err) {
                console.log(err.message);
                return res.status(500).json({
                    msg: "couldn't load the file"
                })
            } else {
                const todoData = JSON.parse(data);
                const newTodo = {
                    id: todoData.length + 1,
                    title: title,
                    description: description,
                    completed: false,
                }
                todoData.push(newTodo);
                //console.log(newTodo);
                fs.writeFile('./temp/todo.json', JSON.stringify(todoData, null, 2), (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            msg: "couldn't upload the file"
                        })
                    };
                    return res.status(200).json({
                        msg: "todo created successfully",
                        todo: newTodo,
                    })
                });

            }
        })
    } catch (err) {
        console.log('getting error ' + err.message);
        return res.status(500).json({
            msg: "couldn't created todo's!"
        })
    }
};


export function deleteTodoById(req, res){
    const todo_id = parseInt(req.params.id);
    if(isNaN(todo_id)){
        return res.status(500).json({
            msg:"invalid id format"
        })
    }
    try{
        fs.readFile('./temp/todo.json', "utf8", (err, data)=>{
            if(err){
                return res.status(500).json({
                    msg:"couldn't load the file"
                })
            }
            else{
                const todoData = JSON.parse(data);
                const getData = todoData.find(todo => todo.id === todo_id);
                const indexId = todoData.findIndex(todo => todo.id === parseInt(getData.id));
                console.log(indexId);
                if(isNaN(indexId) || (indexId === -1)){
                    return res.status(500).json({
                        msg:"invalid id"
                    })
                }else{
                    todoData.splice(indexId,1);
                    fs.writeFile('./temp/todo.json', JSON.stringify(todoData, null, 2), (err) =>{
                        if(err){
                            return res.status(500).json({
                                msg:"failed to delete the id"
                            })
                        }else{
                            return res.status(200).json({
                                msg:"id deleted succesfully!",
                                todo:getData,
                            })
                        }
                    })
                }
            }
        })
    }catch(err){
        console.log(err.message);
        return res.status(404).json({
            msg:`getting error ${err.message}`
        })
    }
}


export function updateTodoById(req, res){
    const todo_id = parseInt(req.params.id);
    console.log(todo_id);
    const {title, description} = req.body;
    if(isNaN(todo_id)){
        return res.status(500).json({
            msg:"invalid id format"
        })
    }
    try{
        fs.readFile('./temp/todo.json', "utf8", (err, data) =>{
            if(err){
                return res.status(500).json({
                    msg:"couldn't load the file"
                })
            }else{
                const todoData = JSON.parse(data);
                const updateDataById = todoData.find((todo) => {
                    if(todo.id === todo_id){
                        todo.title = title;
                        todo.description = description;
                    }
                });
                fs.writeFile('./temp/todo.json', JSON.stringify(todoData, null, 2), (err) =>{
                    if(err){
                        return res.status(500).json({
                            msg:"coldn't update the file"
                        })
                    }else{
                        return res.status(200).json({
                            msg:"update the todo successfully ",
                        })
                    }
                })
            }
        })

    }catch(err){
        console.log(err.message);
        return res.status(500).josn({
            msg:"getting error "
        })
    }
}

export function todoAsComplete(req, res){
    const todo_id = parseInt(req.params.id);
    if(isNaN(todo_id)){
        return res.status(500).json({
            msg:"invalid id format!"
        })
    }
    try{
        fs.readFile('./temp/todo.json', "utf8", (err, data) =>{
            if(err){
                console.log(err.message);
                return res.status(500).json({
                    msg:"coudln't load the file"
                })
            }else{
                const todoData = JSON.parse(data);
                const updateTodo = todoData.find((todo) =>{
                    if(todo.id === todo_id){
                        todo.completed = true;
                    }
                })
                fs.writeFile('./temp/todo.json', JSON.stringify(todoData, null, 2), (err) =>{
                    if(err){
                        return res.status(500).json({
                            msg:"coldn't update the file"
                        })
                    }else{
                        return res.status(200).json({
                            msg:"todo mark as completed ",
                        })
                    }
                })
            }
        })
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            msg:`${err.message}`
        })
    }
}

export function todoAsIncomplete(req, res){
    const todo_id = parseInt(req.params.id);
    if(isNaN(todo_id)){
        return res.status(500).json({
            msg:"invalid id format!"
        })
    }
    try{
        fs.readFile('./temp/todo.json', "utf8", (err, data) =>{
            if(err){
                console.log(err.message);
                return res.status(500).json({
                    msg:"coudln't load the file"
                })
            }else{
                const todoData = JSON.parse(data);
                const updateTodo = todoData.find((todo) =>{
                    if(todo.id === todo_id){
                        todo.completed = false;
                    }
                })
                fs.writeFile('./temp/todo.json', JSON.stringify(todoData, null, 2), (err) =>{
                    if(err){
                        return res.status(500).json({
                            msg:"coldn't update the file"
                        })
                    }else{
                        return res.status(200).json({
                            msg:"todo mark as incompleted ",
                        })
                    }
                })
            }
        })
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            msg:`${err.message}`
        })
    }
}

export function getTodoByStatus(req, res){
    
}