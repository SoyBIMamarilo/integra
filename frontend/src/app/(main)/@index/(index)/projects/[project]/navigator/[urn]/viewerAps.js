"use client";
import { useEffect, useRef, useState } from "react";
import Script from 'next/script'
import Link from "next/link";
/**
 *Viewer page
 *
 * @param {*} params
 * @return {*} 
 */
const ViewerAps = (params) => {
    let { docUrn, api, handleChangeToken } = params;
    const [viewer3D, setViewer3D] = useState(null);
    const [token, setToken] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const viewer3DRef = useRef(null);
    const [scriptLoaded, setScriptLoaded] = useState(
        typeof window !== 'undefined' ? (typeof window !== "undefined" && window.Autodesk?.Viewing?.Initializer !== undefined) : false
    );

    const [modelProperties, setModelProperties] = useState({ categorys: [], family: [], familyType: [], items: [] });
    const [customParams, setCustomParams] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedFamily, setSelectedFamily] = useState("");
    const [selectedFamilyType, setSelectedFamilyType] = useState("");
    const [selectedItemdb, setSelectedItemdb] = useState("");
    const [selectedGroupItemdb, setselectedGroupItemdb] = useState("");
    const [selectedFilterDb, setselectedFilterDb] = useState("");
    const [totals, setTotals] = useState({})
    const [items, setItems] = useState([])
    const [viewerObject, setViewer] = useState(null)
    const [manualAreaObjects, setManualAreaObjects] = useState([])
    const [manualLengthObjects, setManualLengthObjects] = useState([])
    const [dimensionList, setDimensionList] = useState(["Select the dimension"])
    const selectTtemGroupDbRef = useRef(null);
    const selectCategorysRef = useRef(null);
    const selectFamilysRef = useRef(null);
    const selectFamilyTypesRef = useRef(null);
    const chartBarRef = useRef(null);
    const chartBarCustomRef = useRef(null);
    const selectTtemDbRef = useRef(null);
    const selectFilterDbRef = useRef(null);
    const selectDimensionRef = useRef(null);
    const inputCatManual = useRef(null);
    const inputFamManual = useRef(null);
    const inputTypeManual = useRef(null);
    const inputCbsManual = useRef(null);
    const tableRef = useRef(null);
    /**
     *Funcion Handler para seleccionar la categoria
     *
     * @param {*} e parametro events.
     */
    function handleCategorysSelect(e) {
        const categorySel = e.target.value;
        setSelectedCategory(categorySel);
        setSelectedFamily("");
        setSelectedFamilyType("");
        // restart Cbs filters
        setselectedGroupItemdb("");
        setSelectedItemdb("");
        setselectedFilterDb("");
    }


    /**
     *Funcion Handler para Seleccion de la Familia.
     *
     * @param {*} e parametro events
     */
    function handleFamilysSelect(e) {
        const familySel = e.target.value;
        setSelectedFamily(familySel);
        setSelectedFamilyType("");
        // restart Cbs filters
        setselectedGroupItemdb("");
        setSelectedItemdb("");
        setselectedFilterDb("");

    }
    /**
     *Funcion Handler para Seleccion del typo de Familia.
     *
     * @param {*} e parametro events
     */
    function handleFamilyTypesSelect(e) {
        const familyTypeSel = e.target.value;
        setSelectedFamilyType(familyTypeSel);
        // restart Cbs filters
        setselectedGroupItemdb("");
        setSelectedItemdb("");
        setselectedFilterDb("");
    }
    /**
     *Funcion Handler para Seleccion del grupo o tipoesCBS.
     *
     * @param {*} e parametro events
     */
    function handleItemGroupdbSelect(e) {
        const itemValue = e.target.value;
        setSelectedItemdb("");
        setselectedFilterDb("");
        setselectedGroupItemdb(itemValue);
    }
    /**
     *Funcion Handler para Seleccion de la unidades de Medida.
     *
     * @param {*} e parametro events
     */
    function handleItemdbSelect(e) {
        const itemValue = e.target.value;
        setselectedFilterDb("");
        setSelectedItemdb(itemValue);
    }
    /**
     *Funcion Handler Seleccion de una unica CBS.
     *
     * @param {*} e parametro events
     */
    function handleFilterDbSelect(e) {
        const itemValue = e.target.value;
        setselectedFilterDb(itemValue);
    }

    /**
     *Funcion
     *
     * @param {*} dbid
     */
    function isolateItems(dbid) {
        viewer3D.isolate();
        viewer3D.fitToView();
        viewer3D.select(dbid);
        viewer3D.isolate(dbid);
        viewer3D.fitToView(dbid, viewer3D.model);
    }


    async function handleFilterData(){
        const cat = modelProperties.categorys.filter(category=>category.dbid ==selectedCategory)
        const fam = modelProperties.family.filter(family=>family.dbid == selectedFamily)
        const typ = modelProperties.familyType.filter(famT=>famT.dbid == selectedFamilyType)
        const filterData = {
            categoria:selectedCategory!==""? cat[0].categoryName:null, 
            familia:selectedFamily!==""?fam[0].categoryName:null, 
            tipo:selectedFamilyType!==""?typ[0].categoryName:null, 
            parametro:selectedGroupItemdb, 
            dimension:selectedItemdb, 
            filtro:selectedFilterDb,
            ...totals,
            modelo_id:1
        }

        const res = await fetch("/api/revit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(filterData),
          });

        console.log(res.status)
        console.log(await res.json())
        console.log(filterData)
    }

    async function handleUploadManual(){
        const cat = inputCatManual.current.value
        const fam = inputFamManual.current.value
        const typ = inputTypeManual.current.value
        const dym = selectDimensionRef.current.value
        const cbs = inputCbsManual.current.value
        const measureExtension = viewerObject.getExtension('Autodesk.Measure')
        if(measureExtension.isActive()){
            const measures = measureExtension.getMeasurementList("m",4)
            const dFilter = dym === "Length"?"Distance":dym
            const objects = measures.filter((item)=>item.type === dFilter)
            const complement = measures.filter((item)=>item.type !== dFilter)
            const units = objects.length
            let quant = 0
            objects.forEach((item)=>{quant +=parseFloat(item[dFilter.toLowerCase()])})
            const filterData = {
                categoria:cat,
                familia:fam, 
                tipo:typ, 
                parametro:"", 
                dimension:dym, 
                filtro:cbs,
                unidades:units,
                cantidad:quant,
                modelo_id:1
            }
            const res = await fetch("/api/revit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(filterData),
              });
    
            console.log(objects)
            const response = await res.json()
             if (response.length > 0){
                const res = await fetch("/api/revit/manual", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({type:"measure", data:{medicion_object:JSON.stringify(objects),cbs_cantidades_rvt:response[0].id}}),
                  });
             }
            measureExtension.measureTool.deleteMeasurements()
            measureExtension.measureTool.setMeasurements(complement)
            measureExtension.deactivate()
        }
        else{
            const objects = dym === "Length"?manualLengthObjects:manualAreaObjects
            const units = objects.length
            let quant = 0
            objects.forEach((item)=>{quant +=item.value})
            const filterData = {
                categoria:cat,
                familia:fam, 
                tipo:typ, 
                parametro:"", 
                dimension:dym, 
                filtro:cbs,
                unidades:units,
                cantidad:quant,
                modelo_id:1
            }

            const res = await fetch("/api/revit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(filterData),
              });
    
            console.log(objects)
             const response = await res.json()
             if (response.length > 0){
                const elementData = objects.map((item)=>{return {dbid:item.id, cbs_cantidades_rvt:response[0].id}})
                const res = await fetch("/api/revit/manual", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({type:"element", data:elementData}),
                  });
                console.log(elementData)
             }
            console.log(filterData)

        }
        
    }

    /**
     *
     *
     * @param {*} tableBody cuerpo de la tabla
     * @param {*} headerValue Headers de tabla
     * @param {*} classItems Clases aplicables a la celda
     * @param {*} typeRow TH TR o TD
     * @param {boolean} [addSpan=false] Use este para crear un Vinculo para aislar Itemas
     */
    function createTableRow(tableBody, headerValue, classItems, typeRow, addSpan = false) {
        let td = "";
        let tr = "";
        tr = document.createElement('TR');
        td = document.createElement(typeRow);
        td.className = classItems
        td.width = '75';
        td.appendChild(document.createTextNode(headerValue[0]));
        tr.appendChild(td);
        td = document.createElement(typeRow);
        td.className = classItems
        td.width = '75';
        td.appendChild(document.createTextNode(headerValue[1]));
        tr.appendChild(td);
        //Add item
        td = document.createElement(typeRow);
        td.className = classItems
        td.width = '12';
        if (addSpan) {
            let spanDbid = document.createElement('p');
            spanDbid.onclick = () => isolateItems(`${headerValue[2]}`);
            spanDbid.appendChild(document.createTextNode(`${headerValue[2]}`));
            spanDbid.className = "underline text-blue-600 cursor-pointer  !text-ellipsis !overflow-hidden w-20 max-w-20";
            td.appendChild(spanDbid);
        } else
            td.appendChild(document.createTextNode(headerValue[2]));
        tr.appendChild(td);
        //add item
        td = document.createElement(typeRow);
        td.className = classItems
        td.width = '75';
        td.appendChild(document.createTextNode(headerValue[3]));
        tr.appendChild(td);
        tableBody.appendChild(tr);
    }

    /**
     *Funcion par obtener el tocken de APS para el visor y no genere errores por Session.
     *
     * @param {*} callback
     */
    async function getAccessToken(callback) {
        try {
            const resp = await fetch('/api/aps/oauth/token');
            if (!resp.ok)
                throw new Error(await resp.text());
            const { access_token, expires_in } = await resp.json();
            handleChangeToken(access_token, expires_in);
            callback(access_token, expires_in);
        } catch (err) {
            //alert('Could not obtain access token. See the console for more details.');
            console.error("Could not obtain access token", err);
        }
    }

    useEffect(() => {
        if (selectedItemdb !== "" && selectedGroupItemdb !== "") {
            if (customParams) {
                let selectedProp = null;
                let data = null;
                let evalProp = null;
                let labels = [];
                let total = 0;
                let countdb = 0;
                data = customParams.map(item => {
                    selectedProp = item.props.find(x => x.displayName == selectedGroupItemdb);
                    evalProp = item.props.find(x => x.displayName == (selectedItemdb !== "" ? selectedItemdb : "Area"));
                    total = typeof evalProp !== "undefined" ? Number(evalProp.displayValue.toFixed(2)) : 0;
                    return { group: (typeof selectedProp !== "undefined" ? selectedProp.displayValue : ""), valor: total, dbid: item.dbid };
                });
                //Filter only selected property
                tableRef.current.innerHTML = "";
                let table = tableRef.current;
                let tableBody = document.createElement('TBODY');
                let valorItem = 0;
                let subTotal = 0;
                let totalCountdb = 0;
                let classItems = "border px-6 py-3 text-left text-[10px]";
                labels = [...new Set(data.map(item => item.group))];
                //Load other Dropdown
                selectFilterDbRef.current.innerHTML = `<option className='text-xs' value="">Select the Filter</option>${labels.map((item) => (`<option className='text-xs' value="${item}">${item}</option>`)).join('\n')}`;
                let itemText = "";
                itemText += selectedCategory !== "" ? `>${modelProperties.categorys.find(x => x.dbid == parseInt(selectedCategory)).categoryName}` : "";
                itemText += selectedFamily !== "" ? `>${modelProperties.family.find(x => x.dbid == parseInt(selectedFamily)).categoryName}` : "";
                itemText += selectedFamilyType !== "" ? `>${modelProperties.familyType.find(x => x.dbid == parseInt(selectedFamilyType)).categoryName}` : "";
                let dataChart = [];
                if (selectedFilterDb !== "") {
                    data = data.filter(item => item.group == selectedFilterDb);
                    labels = labels.filter(item => item == selectedFilterDb);
                }
                for (let label of labels) {
                    createTableRow(tableBody, [`${itemText}>${label}`, "Cant", "Viewer Id", "Valor"], classItems, "TH");//Addmethod
                    subTotal = 0;
                    countdb = 0;
                    data.forEach(function (groupby, index) {
                        if (groupby.group == label) {
                            valorItem = groupby.valor;
                            subTotal += parseFloat(valorItem);
                            createTableRow(tableBody, [`${itemText}`, "1 Unit", `${groupby.dbid}`, `${valorItem}`], classItems, "TD", true);//Addmethod               
                            countdb += 1;
                        }
                    });
                    totalCountdb += countdb;
                    total += subTotal;
                    createTableRow(tableBody, [`Subtotal Items`, `${countdb} Units`, "", `${subTotal.toFixed(2)}`], classItems, "TH");//Addmethod
                    subTotal = 0;
                    dataChart.push(subTotal);
                }
                createTableRow(tableBody, [`Total Items`, `${totalCountdb} Units`, "", `${total.toFixed(2)}`], classItems, "TH");//Addmethod    
                setTotals({unidades: totalCountdb, cantidad: total})    
                table.appendChild(tableBody);
                //tableRef.current.appendChild(table);
                if (!window.Chart)
                    return;
                if (window.chartCustom)
                    window.chartCustom.destroy();
                window.chartCustom = new Chart(chartBarCustomRef.current.getContext("2d"), {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: `Gross ${selectedItemdb}`,
                                backgroundColor: "#79AEC8",
                                borderColor: "#417690",
                                data: dataChart
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true,
                            }
                        },
                        "scales": {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        title: {
                            display: true,
                            text: 'Chart Bar Custom'
                        }
                    }
                });
            }
        }
        console.log(customParams)
    }, [selectedItemdb, customParams, selectedGroupItemdb, selectedFilterDb])
    //Chart Family Type Subtype
    useEffect(() => {
        if (!window.Chart)
            return;
        if (window.chartCantidad)
            window.chartCantidad.destroy();
        if (selectedCategory) {
            let subTotal = 0;
            let total = 0;
            //let totalLong = 0;  let totalVol = 0;
            const family = selectedCategory !== "" ? modelProperties.family.filter((item) => item.parent[0] == selectedCategory) : [];
            let childrens = [];
            let labels = [];
            let dataChart = [];
            let childsTypes = [];
            if (family.length > 0) {
                childrens = family.map(item => item.childrens);
                childrens = childrens ? childrens.join(",").split(",") : [0];
                labels = family.map(item => item.categoryName);
                labels = labels ? labels.join(",").split(",") : "";

                family.map(item => { childsTypes.push({ name: item.categoryName, childs: item.childrens }) });
            }
            let dbids = [];
            //items selected
            childsTypes = childsTypes.map((propertys) => {
                let childsTypes = modelProperties.familyType.filter(item => propertys.childs.includes(item.dbid));
                dbids = childsTypes.map(item => item.childrens);
                dbids = dbids ? dbids.join(",").split(",") : [0];
                return { name: propertys.name, childs: dbids.map((id) => parseInt(id)) };
            });

            let childs = modelProperties.familyType.filter(item => childrens.includes(item.dbid.toString()));
            childrens = childs.map(item => item.childrens);
            childrens = childrens ? childrens.join(",").split(",") : [0];

            const typesFamily = selectedFamily !== "" ? modelProperties.familyType.filter((item) => item.parent[0] == selectedFamily) : [];
            if (typesFamily.length > 0) {
                childrens = typesFamily.map(item => item.childrens);
                childrens = childrens ? childrens.join(",").split(",") : [0];
                labels = typesFamily.map(item => item.categoryName);
                labels = labels ? labels.join(",").split(",") : "";
                childsTypes = [];
                typesFamily.map(item => { childsTypes.push({ name: item.categoryName, childs: item.childrens }) });
            }
            //items Selected
            childsTypes = childsTypes.map((propertys) => {
                let childsTypes = modelProperties.items.filter(item => propertys.childs.includes(item.dbid));
                dbids = childsTypes.map(item => item.dbid);
                dbids = dbids ? dbids.join(",").split(",") : [0];
                return { name: propertys.name, childs: dbids.map((id) => parseInt(id)) };
            });

            //getData to chart by one by one 
            //Push Area
            let dataBarArea = { label: [], data: [], backgroundColor: `#${Math.random().toString(16).slice(2, 8)}`, borderWidth: 1 };
            //let dataBarVolumen = { label: [], data: [], backgroundColor: `#${Math.random().toString(16).slice(2, 8)}`, borderWidth: 1 }
            if (selectedItemdb !== "") {
                dataBarArea.label.push(selectedItemdb);
                //dataBarVolumen.label.push(selectedItemdb);
            }
            else {
                dataBarArea.label.push("Area");
                //dataBarVolumen.label.push("Volumen");
            }
            if (selectedFamilyType !== "") {
                let item = modelProperties.familyType.find(x => x.dbid == parseInt(selectedFamilyType));
                dbids = item.childrens;
                childsTypes = [];
                childsTypes.push({ name: item.categoryName, childs: dbids });
            }
            let customItems = [];
            tableRef.current.innerHTML = "";
            let table = tableRef.current;
            let tableBody = document.createElement('TBODY');
            let valorItem = 0;
            let classItems = "border px-6 py-3 text-left text-[10px]";
            let dbIsolateDbids = [];
            childsTypes.map((propertys, index) => {
                let items = modelProperties.items.filter(item => propertys.childs.includes(item.dbid));
                if (index == 0) {
                    let filterDimension = ["Area", "Volume", "Length"];
                    selectTtemDbRef.current.innerHTML = `<option className='text-xs' value="">Select the Dimension</option>${items[0].props.filter(x => x.type == 3 && filterDimension.includes(x.displayName)).map((x) => x.displayName).map((item) => (`<option className='text-xs' value="${item}">${item}</option>`)).join('\n')}`;
                    selectTtemGroupDbRef.current.innerHTML = `<option className='text-xs' value="">Select the Group</option>${items[0].props.filter(x => x.type == 20 && x.displayName.toLowerCase().indexOf("cbs") > -1).map((x) => x.displayName).map((item) => (`<option className='text-xs' value="${item}">${item}</option>`)).join('\n')}`
                }
                if (items.length > 0) {
                    let evalProp = null;
                    customItems = [...customItems, ...items];
                    let itemText = "";
                    itemText += selectedCategory !== "" ? `>${modelProperties.categorys.find(x => x.dbid == parseInt(selectedCategory)).categoryName}` : "";
                    itemText += selectedFamily !== "" ? `>${modelProperties.family.find(x => x.dbid == parseInt(selectedFamily)).categoryName}` : "";
                    itemText += selectedFamilyType !== "" ? `>${modelProperties.familyType.find(x => x.dbid == parseInt(selectedFamilyType)).categoryName}` : "";
                    createTableRow(tableBody, [`${itemText}>${propertys.name}`, "Cant", "Viewer Id", "Valor"], classItems, "TH");//Addmethod
                    items.forEach(function (item) {
                        evalProp = item.props.find(x => x.displayName == (selectedItemdb !== "" ? selectedItemdb : "Area"));
                        valorItem = typeof evalProp !== "undefined" ? Number(evalProp.displayValue.toFixed(2)) : 0;
                        subTotal += valorItem;
                        createTableRow(tableBody, [`${itemText}>${item.categoryName}`, "1 Unit", `${item.dbid}`, `${valorItem}`], `${classItems} item-${index}`, "TD", true);//Addmethod
                        dbIsolateDbids.push(item.dbid);
                    });
                    createTableRow(tableBody, [`Subtotal Items`, `${items.length} Units`, dbIsolateDbids, `${subTotal.toFixed(2)}`], `${classItems} item-${index}`, "TH", true);//Addmethod                    

                }
                dataBarArea.data.push(subTotal);
                total += subTotal;
                subTotal = 0;
                dbIsolateDbids = [];
                //dataBarVolumen.data.push(totalVol);
            });
            createTableRow(tableBody, [`Total Items`, `${customItems.length} Units`, "", `${total.toFixed(2)}`], classItems, "TH");//Addmethod    
            
            table.appendChild(tableBody);
            setTotals({unidades: customItems.length, cantidad: total})
            //tableRef.current.appendChild(table);
            setCustomParams(customItems);
            dataChart.push(dataBarArea);
            //dataChart.push(dataBarVolumen);
            let items = modelProperties.items.filter(item => childrens.includes(item.dbid.toString()));
            items = selectedFamilyType !== "" ? modelProperties.items.filter((item) => item.parent[0] == selectedFamilyType) : items;
            if (childsTypes.length > 0) {
                document.getElementById("ChartContainer").style.display = "block";
                labels = childsTypes.map(x => x.name);
                //[...new Set(labels.map(item => item))]
                window.chartCantidad = new Chart(chartBarRef.current.getContext("2d"), {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: dataChart
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true,
                            }
                        },
                        "scales": {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        title: {
                            display: true,
                            text: ' Bar Chart'
                        }
                    }
                });
            }
        }
    }, [selectedCategory, selectedFamily, selectedFamilyType, selectedItemdb])
    //Fill dropdowns
    useEffect(() => {
        const familylist = selectedCategory !== "" ? modelProperties.family.filter((item) => item.parent[0] == selectedCategory) : [];
        if (familylist.length > 0)
            selectFamilysRef.current.innerHTML = `<option className='text-xs' value="">Select the Type</option> ${familylist.map((item) => (`<option className='text-xs' value="${item.dbid}">${item.categoryName}</option>`)).join('\n')}`;

        const typeslist = selectedFamily !== "" ? modelProperties.familyType.filter((item) => item.parent[0] == selectedFamily) : [];
        if (typeslist.length > 0)
            selectFamilyTypesRef.current.innerHTML = `<option className='text-xs' value="">Select the Type</option> ${typeslist.map((item) => (`<option className='text-xs' value="${item.dbid}">${item.categoryName}</option>`)).join('\n')}`;

    }, [modelProperties, selectedCategory, selectedFamily])

    //Metodo para determinar si Autodesk js esta creado.
    useEffect(() => {
        if (scriptLoaded && !initialized) {
            let options = {
                env: 'AutodeskProduction',
                getAccessToken: getAccessToken
            };
            Autodesk.Viewing.Initializer(options, function () { setInitialized(true); });

        }
    }, [initialized, scriptLoaded]);
    //Generamos la data desde el Visor y la almacenamos en un Array. por tipologias.
    useEffect(() => {
        if (scriptLoaded && initialized) {
            let options = {
                env: 'AutodeskProduction',
                getAccessToken: getAccessToken
            };
            Autodesk.Viewing.Initializer(options, () => {
                const config = {
                    extensions: ['Autodesk.DocumentBrowser', 'Autodesk.VisualClusters', "LoggerExtension", "HistogramExtension"],
                    memory: { limit: 2000 }
                };
                const viewer = new Autodesk.Viewing.GuiViewer3D(viewer3DRef.current, config);
                var startedCode1 = viewer.start();
                if (startedCode1 > 0) {
                    console.error("Failed to create a Viewer: WebGL not supported.")
                    return
                }
                viewer.setTheme('light-theme');
                if (viewer) {
                    loadModel(viewer, docUrn);
                    setViewer(viewer)
                }

            });
            /**
             *Get Propertys of Model
             *
             * @param {*} viewer
             */
            const getPropertysModel = async (viewer) => {
                let instanceTree = viewer.model.getData().instanceTree;
                
                if (instanceTree.nodeAccess) {
                    //alert("se ha generado GEOMETRY_LOADED_EVENT");
                    let alldbsIDS = Object.keys(instanceTree.nodeAccess.dbIdToIndex);
                    let mydbids = alldbsIDS.map((id) => parseInt(id));
                    viewer.model.getBulkProperties(mydbids, {}, function (results) {
                        for (const result of results) {
                            if (result.properties.length > 0) {
                                if (result.properties[0].displayName == "Category") {
                                    if (result.properties[1].displayName == '_RC') {
                                        if (modelProperties.categorys.length > 0)
                                            modelProperties.categorys.find((cats) => cats.dbid == result.dbId) ? "" : modelProperties.categorys.push({ dbid: result.dbId, categoryName: result.properties[1].displayValue, childrens: result.properties.filter((item) => item.displayName == "child").map(item => item.displayValue), parent: result.properties.filter((item) => item.displayName == "parent").map(item => item.displayValue) });
                                        else
                                            modelProperties.categorys.push({ dbid: result.dbId, categoryName: result.properties[1].displayValue, childrens: result.properties.filter((item) => item.displayName == "child").map(item => item.displayValue), parent: result.properties.filter((item) => item.displayName == "parent").map(item => item.displayValue) });
                                    } else if (result.properties[1].displayName == '_RFN') {
                                        if (modelProperties.family.length > 0)
                                            modelProperties.family.find((fam) => fam.dbid == result.dbId) ? "" : modelProperties.family.push({ dbid: result.dbId, categoryName: result.properties[1].displayValue, childrens: result.properties.filter((item) => item.displayName == "child").map(item => item.displayValue), parent: result.properties.filter((item) => item.displayName == "parent").map(item => item.displayValue) });
                                        else
                                            modelProperties.family.push({ dbid: result.dbId, categoryName: result.properties[1].displayValue, childrens: result.properties.filter((item) => item.displayName == "child").map(item => item.displayValue), parent: result.properties.filter((item) => item.displayName == "parent").map(item => item.displayValue) });
                                    } else if (result.properties[1].displayName == '_RFT') {
                                        if (modelProperties.familyType.length > 0)
                                            modelProperties.familyType.find((famT) => famT.dbid == result.dbId) ? "" : modelProperties.familyType.push({ dbid: result.dbId, categoryName: result.properties[1].displayValue, childrens: result.properties.filter((item) => item.displayName == "child").map(item => item.displayValue), parent: result.properties.filter((item) => item.displayName == "parent").map(item => item.displayValue) });
                                        else
                                            modelProperties.familyType.push({ dbid: result.dbId, categoryName: result.properties[1].displayValue, childrens: result.properties.filter((item) => item.displayName == "child").map(item => item.displayValue), parent: result.properties.filter((item) => item.displayName == "parent").map(item => item.displayValue) });
                                    }
                                }
                                else if (result.properties[0].displayName == "ElementId") {
                                    if (modelProperties.items.length > 0)
                                        modelProperties.items.find((item) => item.dbid == result.dbId) ? "" : modelProperties.items.push({ dbid: result.dbId, categoryName: result.properties[1].displayValue, parent: result.properties.filter((item) => item.displayName == "parent").map(item => item.displayValue), props: result.properties });
                                    else
                                        modelProperties.items.push({ dbid: result.dbId, categoryName: result.properties[1].displayValue, parent: result.properties.filter((item) => item.displayName == "parent").map(item => item.displayValue), props: result.properties });
                                }
                            }
                        }
                        selectCategorysRef.current.innerHTML = `<option className='text-xs' value="">Select the category</option>${modelProperties.categorys.map((item) => (`<option className='text-xs' value="${item.dbid}">${item.categoryName}</option>`)).join('\n')}`;
                        setModelProperties(modelProperties);
                    });
                }
            }
            /**
             *Load Model and extensions
             *
             * @param {*} viewer
             * @param {*} urn
             * @return {*} 
             */
            const loadModel = async (viewer, urn) => {
                return new Promise(function (resolve, reject) {
                    function onDocumentLoadSuccess(doc) {
                        resolve(viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry()));
                        //Cargamos Extensiones Autodesk
                        viewer.loadExtension('Autodesk.Explode');
                        viewer.loadExtension('Autodesk.DocumentBrowser');
                        //Custom Extensions referenciadas en Js
                        viewer.loadExtension('Autodesk.VisualClusters');
                        viewer.loadExtension("NestedViewerExtension", { filter: ["2d", "3d"], crossSelection: true });
                        viewer.loadExtension("LoggerExtension");
                        viewer.loadExtension("HistogramExtension");

                        viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, function () {
                            getPropertysModel(viewer);
                        });
                    }
                    function onDocumentLoadFailure(code, message, errors) {
                        reject({ code, message, errors });
                    }

                    function onMeasureActivated(){
                        const measureExtension = viewer.getExtension('Autodesk.Measure')
                        if(measureExtension.isActive()){
                            setDimensionList(["Select the dimension"])
                            const measures = measureExtension.getMeasurementList("m",4)
                            console.log(measures)
                            const lObjects = measures.filter((item)=>item.type === "Distance").length>0
                            const aObjects = measures.filter((item)=>item.type === "Area").length>0
                            if (lObjects || aObjects){
                                const dList = []
                                if (lObjects) {
                                    dList.push("Length")
                                }
                                if (aObjects) {
                                    dList.push("Area")
                                }
                                setDimensionList(dList)
                            }
                        }
                    }

                    function onViewerSelectionChange() {
                        const ids = viewer.getSelection()
                        setManualAreaObjects([])
                        setManualLengthObjects([])
                        setDimensionList(["Select the dimension"])

                        
                        const model = viewer.model
                        ids.forEach(id => {
                            model.getProperties(id, (result)=>{
                                const propList = result.properties
                                if (propList.length>0){
                                    const lengthProp = propList.filter((item)=>item.displayName === "Length")
                                    if (lengthProp.length>0){
                                        setManualLengthObjects((prev)=>[...prev,{id,value:lengthProp[0].displayValue}])
                                        setDimensionList(prev =>{
                                            if (prev[0]==="Select the dimension") {
                                                return ["Length"]
                                            }
                                            else if(prev.length === 1 && prev[0] === "Area"){
                                                return [...prev, "Length"]
                                            }
                                            return prev
                                        })

                                    }
                                    const areaProp = propList.filter((item)=>item.displayName === "Area")
                                    if (areaProp.length>0){
                                        setManualAreaObjects((prev)=>[...prev,{id,value:areaProp[0].displayValue}])
                                        setDimensionList(prev =>{
                                            if (prev[0]==="Select the dimension") {
                                                return ["Area"]
                                            }
                                            else if(prev.length === 1 && prev[0] === "Length"){
                                                return [...prev, "Area"]
                                            }
                                            return prev
                                        })
                                    }
                                }
                            })
                            
                        });
                        

                        
                    }

                    viewer.setLightPreset(0);
                    Autodesk.Viewing.Document.load('urn:' + urn, onDocumentLoadSuccess, onDocumentLoadFailure);
                    setViewer3D(viewer);
                    viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT,onViewerSelectionChange);
                    viewer.addEventListener(Autodesk.Viewing.EXTENSION_ACTIVATED_EVENT,onMeasureActivated);

                });
            }
            return () => {
                if (!viewer3D) return
                viewer3D.finish()
                setViewer3D(null)
                Autodesk.Viewing.shutdown();
            }
        }
    }, [token, initialized, scriptLoaded, docUrn]);
    return (
        <>
            <Script src="https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.js" strategy="beforeInteractive" onLoad={() => setScriptLoaded(true)} />
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js" />
            {/* <!-- //extensions -->
            <!-- planesviewer --> */}
            <link rel="stylesheet" href="http://cdn.jsdelivr.net/gh/autodesk-forge/forge-extensions/public/extensions/NestedViewerExtension/contents/main.css" as="style" />
            <Script strategy="afterInteractive" src="http://cdn.jsdelivr.net/gh/autodesk-forge/forge-extensions/public/extensions/NestedViewerExtension/contents/main.js"></Script>
            {/* <!-- summaryExt --> */}
            <Script type="module" crossOrigin="anonymous" strategy="afterInteractive" src="extensions/summary/LoggerExtension.js" />
            {/* <!-- histograma --> */}
            <Script type="module" crossOrigin="anonymous" strategy="afterInteractive" src="extensions/Histograms/HistogramExtension.js" />
            <Script src="https://cdnjs.com/libraries/Chart.js"></Script>
            {({ viewer3D }) ? (
                <div className="grid">
                    <div className="h-[2.5vh]">
                        <label htmlFor="cbCategoria" className="text-xs basis-1/4 pr-2">Categoria: </label>
                        <select id="cbCategoria" className='text-xs' name="Categorys" ref={selectCategorysRef} onChange={e => handleCategorysSelect(e)} value={selectedCategory}><option className='text-xs' value="">Select the category</option></select>
                        <label htmlFor="cbFamily" className="text-xs basis-1/4 pr-2">Familia: </label>
                        <select id="cbFamily" className='text-xs' name="Familys" ref={selectFamilysRef} onChange={e => handleFamilysSelect(e)} value={selectedFamily}><option className='text-xs' value="">Select the Family</option></select>
                        <label htmlFor="cbFamilysTypes" className="text-xs basis-1/4 pr-2">Tipo: </label>
                        <select id="cbFamilysTypes" className='text-xs' name="FamilyTypes" ref={selectFamilyTypesRef} onChange={e => handleFamilyTypesSelect(e)} value={selectedFamilyType}><option className='text-xs' value="">Select the FamilyType</option></select>
                    </div>
                    <div className="h-[3vh]">
                        <label htmlFor="cbitemdb" className="text-xs basis-1/4 pr-2">Agrupar por: </label>
                        <select id="cbitemdb" className='text-xs' name="cbitemdb" ref={selectTtemGroupDbRef} onChange={e => handleItemGroupdbSelect(e)} value={selectedGroupItemdb}><option className='text-xs' value="">Select the Group</option></select>
                        <label htmlFor="cbDimesion" className="text-xs basis-1/4 pr-2">Dimension: </label>
                        <select id="cbDimesion" className='text-xs' name="cbDimesion" ref={selectTtemDbRef} onChange={e => handleItemdbSelect(e)} value={selectedItemdb}><option className='text-xs' value="">Select the Dimension</option></select>
                        <label htmlFor="cbFilter" className="text-xs basis-1/4 pr-2">Filter: </label>
                        <select id="cbFilter" className='text-xs' name="cbFilter" ref={selectFilterDbRef} onChange={e => handleFilterDbSelect(e)} value={selectedFilterDb}><option className='text-xs' value="">Select the Filter</option></select>
                        
                        <button className="h-4 text-xs bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-0 px-0 rounded-2 ml-6 px-3" onClick={handleFilterData}>Añadir cantidad</button>
                        <Link href="/viewer/values"><button className="h-4 text-xs bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-0 px-0 rounded-2 ml-6 px-3" >Registro Cantidades</button></Link>
                    </div>
                    <div className="h-[3vh]">
                        
                        <label htmlFor="cbQuant" className="text-xs basis-1/4 pr-2">Dimension: </label>
                        <select id="cbQuant" className='text-xs' name="cbQuant" ref={selectDimensionRef} > {dimensionList.map((op)=>(<option className='text-xs' value={op==="Select the dimension"?"":op}>{op}</option>))}</select>
                        <label htmlFor="cbQuant" className="text-xs basis-1/4 pr-2">Categoria: </label>
                        <input placeholder="Categoria Manual" className='text-xs' ref={inputCatManual}></input>
                        <label htmlFor="cbQuant" className="text-xs basis-1/4 pr-2" >Familia: </label>
                        <input placeholder="Familia Manual" className='text-xs'ref={inputFamManual}></input>
                        <label htmlFor="cbQuant" className="text-xs basis-1/4 pr-2">Tipo: </label>
                        <input placeholder="Tipo Manual" className='text-xs' ref={inputTypeManual}></input>
                        <label htmlFor="cbQuant" className="text-xs basis-1/4 pr-2" >CBS: </label>
                        <input placeholder="CBS Manual" className='text-xs' ref={inputCbsManual}></input>
                        <button className="h-4 text-xs bg-gray-300 text-gray-400 font-bold py-0 px-0 rounded-2 ml-6 px-3"  onClick={handleUploadManual}>Cantidades Manuales</button>
                    </div>
                    
                    <div className="h-[82vh] grid"><div id="viewer" ref={viewer3DRef}></div></div>
                    <div id="ChartContainer" className="chart-container overflow-auto mt-16" style={{ zIndex: "3", position: 'absolute', width: "35em", height: '18em', backgroundColor: "White", display: "none", padding: '1px' }}>

                        {/* remove !hidden if you need a Graphic */}
                        <div id="ChartContainerheader" className="docking-panel-title sticky top-0 text-center gap-28 bg-slate-500">Cantidades<span className="float-right rounded-md bg-slate-400 cursor-pointer" onClick={() => { document.getElementById("ChartContainer").style.display = "none" }}>X</span></div>
                        <canvas ref={chartBarRef} className="chart mt-2 !hidden"></canvas>
                        <canvas ref={chartBarCustomRef} className="chart mt-2 !hidden"></canvas>
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" ref={tableRef} id="myDynamicTable"></table>
                    </div>
                    
                </div>

            ) : (
                <div> Plese include viewer3D.min.js to the index.html</div>
            )
            }
        </>
    )
}
export default ViewerAps