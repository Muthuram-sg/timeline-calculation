import React, { useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
const Excel = require("exceljs");
const FileSaver = require('file-saver');
const type = [
    {
        id: 0,
        title: "None"
    },
    {
    id: 1,
    title: "Front End Design"
    },
    {
        id: 2,
        title: "Basic Function"
    },
    {
        id: 3,
        title: "API"
    },
    {
        id: 4,
        title: "Database"
    }
]
const level = [
    {
        id: 1,
        title: "Low"
    },
    {
        id: 2,
        title: "Medium"
    },
    {
        id: 3,
        title: "High"
    }
]
const property = [
{"id":1,"title":"Icon","type": 1},
{"id":2,"title":"label","type": 1},
{"id":3,"title":"Text","type": 1},
{"id":4,"title":"Button","type": 1},
{"id":5,"title":"Textbox","type": 1},
{"id":6,"title":"Dropdown","type": 1},
{"id":7,"title":"Checkbox","type": 1},
{"id":8,"title":"Radio","type": 1},
{"id":9,"title":"Toggle","type": 1},
{"id":10,"title":"Table","type": 1},
{"id":11,"title":"Link","type": 1},
{"id":12,"title":"modal","type": 1},
{"id":13,"title":"breadcrumbs","type": 1},
{"id":14,"title":"list","type": 1},
{"id":15,"title":"chart","type": 1},
{"id":16,"title":"Graphql permission","type": 2},
{"id":17,"title":"graphql query preparation","type": 2},
{"id":18,"title":"iteration functions","type": 2},
{"id":19,"title":"conditional functions","type": 2},
{"id":20,"title":"React component creation","type": 2},
{"id":21,"title":"call back functions","type": 2},
{"id":22,"title":"Routing","type": 2},
{"id":23,"title":"state creation","type": 2},
{"id":24,"title":"useeffect","type": 2},
{"id":25,"title":"custom hooks","type": 2},
{"id":26,"title":"routing","type": 3},
{"id":27,"title":"conditional functions","type": 3},
{"id":28,"title":"iterational function","type": 3},
{"id":29,"title":"database query preparation","type": 3},
{"id":30,"title": "Table Creation", "type": 4},
{"id":31,"title": "Table updation","type": 4},
{"id":32,"title": "Hasura Permissions","type": 4},
{"id":33,"title": "DB Triggers or Functions","type": 4}
];

const Estimations = [
    {        
        property:  1,
        level: 1,
        value: 5
    },
    {        
        property:  1,
        level: 2,
        value: 15
    },
    {        
        property:  1,
        level: 3,
        value: 30
    }
];

function Form(){
    const [rows,setRows] = useState([{row:1,property: property}]);
    const [types] = useState(type);
    const [totalDuration,setTotalDuration]=useState('00:00:00')
    const issue_name = useRef();
    // Execute if any components change in the state of rows to re-calculate the over-all duration
    const overallDuration = ()=>{
        let totalMinutes = 0;
        rows.forEach(x=>{
            if(x.duration){
                totalMinutes += x.duration;
            }
        })
        if (!isNaN(totalMinutes)) {
            const days = Math.floor(totalMinutes / 1440);
            const remainingMinutesAfterDays = totalMinutes % 1440;
            const hours = Math.floor(remainingMinutesAfterDays / 60);
            const remainingMinutes = remainingMinutesAfterDays % 60;
            const formatted = `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;      
            setTotalDuration(formatted);
        }else{
            setTotalDuration('00:00:00')
        }
    }
    function generateRandom4DigitId() {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }
    const addNewRow = () =>{
        const rows_arr = [...rows]
        const random_no = generateRandom4DigitId()
        const new_row_obj = {row: random_no};
        rows_arr.push(new_row_obj)
        setRows(rows_arr);
    }
    const addInNextRow = (index) =>{
        const rows_arr = [...rows];
        const random_no = generateRandom4DigitId()
        const new_row_obj = {row: random_no};
        rows_arr.splice(index+1,0,new_row_obj);
        console.log('rows_arr',rows_arr);
        setRows(rows_arr);
    }
    const deleteCurrentRow = (row_no) =>{ 
        const rows_arr = [...rows];
        const row_index = rows_arr.findIndex(r=>r.row === row_no); 
        if(row_index >=0){
            rows_arr.splice(row_index,1);
            if(rows_arr[row_index].duration){
                overallDuration();
            }
            setRows(rows_arr)
        }        
    }
    const updateDescription = (e,index) =>{
        const rows_arr = [...rows];
        rows_arr[index].description = e.target.value;
        setRows(rows_arr)
    }
    const updateLevel = (value,index) =>{
        const rows_arr = [...rows];
        let duration = 0;
        if(rows_arr[index].property_val && value.id){
            duration = findEstimation(value.id,rows_arr[index].property_val.id)
        }
        rows_arr[index].level = value;
        rows_arr[index].duration = duration;
        overallDuration();
        setRows(rows_arr)
    }

    const updateProperty = (value,index) =>{
        const rows_arr = [...rows];
        let duration = 0;
        if(value.id && rows_arr[index].level){
            duration = findEstimation(rows_arr[index].level.id,value.id)
        }
        rows_arr[index].property_val = value;
        rows_arr[index].duration = duration;
        overallDuration();
        setRows(rows_arr)
    }

    const updateType = (value,index) =>{ 
        const rows_arr = [...rows];
        rows_arr[index].type = value;
        const property_li = property.filter(li=>li.type===value.id)
        rows_arr[index].property = property_li;              
        rows_arr[index].property_val = null
        rows_arr[index].duration = 0;
        overallDuration();
        setRows(rows_arr)
    }
    const findEstimation = (level,property) =>{
        const filteredEst = Estimations.filter(x=>x.level===level && x.property ===property);
        return filteredEst.length >0 ?filteredEst[0].value:0
    }
    const generateExcel = () =>{
        if(!issue_name.current.value || issue_name.current.value.length < 5){
            alert("Please enter issue name with minimum 5 letters");
            return;
        }
        let missed_fields = 0;
        let formatedRows = [];
        rows.every((steps) => { 
            console.log('steps',steps);
                if(steps.description && steps.type && steps.type.title && steps.type && steps.property_val && steps.property_val.title && steps.level && steps.level.title){
                    formatedRows.push({
                        Description: steps.description,
                        Type: steps.type.title,
                        Property: steps.property_val.title,
                        Level: steps.level.title,
                        Duration: steps.duration?steps.duration:0+' Mins'
                    })
                    return true;
                }else{
                    missed_fields = 1;
                   return false;
                }                                            
        })
        if(missed_fields===1){
            alert("Plese enter all fields")
        }else{
            excelProcess(issue_name.current.value,formatedRows)
        }
    }
    const excelProcess=(issueName, excelContent)=>{
        if(excelContent && excelContent.length > 0){
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet('timesheet');
            worksheet.columns = [
                { header: 'Description', key: 'Description' },
                { header: 'Type', key: 'Type' },
                { header: 'Property', key: 'Property' },
                { header: 'Level', key: 'Level' },
                { header: 'Duration (Minutes)', key: 'Duration' }
              ];
 
              worksheet.addRows(excelContent);
            workbook.xlsx.writeBuffer()
            .then(buffer => FileSaver.saveAs(new Blob([buffer]), `${issueName}.xlsx`))
            .catch(err => console.log('Error writing excel export', err))

        }    
    }
    const resetForm = () =>{
        setRows([{row:1,property: property}])
    }
    return( 
        <div class="body">
            <div class="form">
                <Grid container spacing={2}>
                    <Grid item lg={6}></Grid>
                    <Grid item lg={3}>
                        <p class="total-duration">{'Total Duration: '+totalDuration}</p>
                    </Grid>
                    <Grid item lg={1}>
                    <Button variant="contained" fullWidth onClick={generateExcel}>Generate</Button>
                    </Grid>
                    <Grid item lg={1}>
                    <Button variant="contained" fullWidth onClick={resetForm}>Reset</Button>
                    </Grid>
                </Grid>
                <Grid container spacing={2} class="padding-top-10">
                    <Grid item lg={12}>
                        <TextField key='textfield-issue_name' fullWidth id="standard-basic" label="Issue Name" variant="standard" inputRef={issue_name}/>
                    </Grid>
                </Grid>
                <div class="fields">
                <Grid container spacing={2}>
                    <>
                    {
                        rows && rows.length > 0 ? rows.map((row,index)=>{
                            return (
                                <>
                                <Grid item xs={3}>
                                    <TextField key={'grid-text-'+row} fullWidth id="standard-basic" label="Description" variant="standard" value={row.description?row.description:''} onChange={(e)=>updateDescription(e,index)}/>
                                </Grid>
                                <Grid item xs={2} key={'grid-type-'+row}>
                                    <Autocomplete
                                        options={types}
                                        getOptionLabel={(option)=>option.title} 
                                        id="disable-close-on-select"
                                        disableCloseOnSelect
                                        renderInput={(params) => (
                                        <TextField {...params} label="Type" variant="standard" />
                                        )}
                                        value={row.type?row.type:null}
                                        onChange={(e,value)=>updateType(value,index)}
                                    />
                                </Grid>
                                <Grid item xs={3} key={'grid-property-'+row}>
                                    <Autocomplete
                                        options={row.property?row.property:[]}
                                        getOptionLabel={(option)=>option.title}
                                        value={row.property_val?row.property_val:null}
                                        id="disable-close-on-select"
                                        disableCloseOnSelect                                        
                                        onChange={(e,value)=>updateProperty(value,index)}
                                        renderInput={(params) => (
                                        <TextField {...params} label="Property" variant="standard" />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={1} key={'grid-auto-level-'+row}>
                                    <Autocomplete
                                        options={level}
                                        getOptionLabel={(option)=>option.title}
                                        id="disable-close-on-select"
                                        disableCloseOnSelect
                                        value={row.level?row.level:null}
                                        onChange={(e,value)=>updateLevel(value,index)}
                                        renderInput={(params) => (
                                        <TextField {...params} label="Level" variant="standard" />
                                        )}
                                    />
                                </Grid>   
                                <Grid item xs={1} key={'grid-auto-level-'+row}>
                                    <p class="point-duration">{row.duration?row.duration:0} Mins</p>
                                </Grid>    
                                <Grid item xs={1}>
                                    <div class='button-padding-top'>
                                    <Button fullWidth onClick={()=>addInNextRow(index)}>Add Next</Button>
                                    </div>                                    
                                </Grid>
                                <Grid item xs={1}>
                                    <div class='button-padding-top'>
                                        <Button fullWidth onClick={()=>deleteCurrentRow(row.row)}>delete</Button>                                        
                                    </div>
                                </Grid>
                                </>
                            )
                        }):(
                            <h3>Add row</h3>
                        )
                    }
                    </>
                    <Grid item lg={11}></Grid>
                    <Grid item lg={1}>
                        <Button variant="contained" fullWidth onClick={addNewRow}>Add</Button>
                    </Grid>
                </Grid>
                </div>
            </div>
        </div>
    )
}
export default Form;