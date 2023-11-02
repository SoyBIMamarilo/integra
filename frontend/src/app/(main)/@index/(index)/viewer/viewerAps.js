"use client";
import { useEffect, useRef, useState } from "react";
import Script from 'next/script'
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
    const selectTtemGroupDbRef = useRef(null);
    const selectCategorysRef = useRef(null);
    const selectFamilysRef = useRef(null);
    const selectFamilyTypesRef = useRef(null);
    const chartBarRef = useRef(null);
    const chartBarCustomRef = useRef(null);
    const selectTtemDbRef = useRef(null);
    const selectFilterDbRef = useRef(null);
    const tableRef = useRef(null);
    function handleCategorysSelect(e) {
        const categorySel = e.target.value;
        setSelectedCategory(categorySel);
        setSelectedFamily("");
        setSelectedFamilyType("");
    }

    function handleFamilysSelect(e) {
        const familySel = e.target.value;
        setSelectedFamily(familySel);
        setSelectedFamilyType("");
    }
    function handleFamilyTypesSelect(e) {
        const familyTypeSel = e.target.value;
        setSelectedFamilyType(familyTypeSel);
    }
    function handleItemdbSelect(e) {
        const itemValue = e.target.value;
        setSelectedItemdb(itemValue);
    }
    function handleItemGroupdbSelect(e) {
        const itemValue = e.target.value;
        setselectedGroupItemdb(itemValue);
    }
    function handleFilterDbSelect(e) {
        const itemValue = e.target.value;
        setselectedFilterDb(itemValue);
    }
    function isolateItems(dbid) {
        viewer3D.isolate();
        viewer3D.isolate(dbid);
        //viewer3D.fitToView(dbid, viewer3D);
    }
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
                if (selectedFilterDb !== "")
                    data = data.filter(item => item.group == selectedFilterDb);
                //Filter only selected property
                tableRef.current.innerHTML = "";
                let table = document.createElement('TABLE');
                table.className = "min-w-full divide-y divide-gray-200 dark:divide-gray-700";
                table.border = '1';
                let tableBody = document.createElement('TBODY');
                let td = "";
                let valorItem = 0;
                let subTotal = 0;
                let totalCountdb = 0;
                let tr = "";
                let classItems = "border px-6 py-3 text-left text-xs";
                labels = [...new Set(data.map(item => item.group))];
                //Load other Dropdown
                selectFilterDbRef.current.innerHTML = `<option className='text-xs' value="">Select the Filter</option>${labels.map((item) => (`<option className='text-xs' value="${item}">${item}</option>`)).join('\n')}`;
                let itemText = "";
                itemText += selectedCategory !== "" ? `${modelProperties.categorys.find(x => x.dbid == parseInt(selectedCategory)).categoryName}>` : "";
                itemText += selectedFamily !== "" ? `${modelProperties.family.find(x => x.dbid == parseInt(selectedFamily)).categoryName}>` : "";
                itemText += selectedFamilyType !== "" ? `${modelProperties.familyType.find(x => x.dbid == parseInt(selectedFamilyType)).categoryName}>` : "";
                let dataChart = [];
                for (let label of labels) {
                    tr = document.createElement('TR');
                    td = document.createElement('TH');
                    td.className = classItems
                    td.width = '75';
                    td.appendChild(document.createTextNode(`${itemText}${label}`));
                    tr.appendChild(td);
                    td = document.createElement('TH');
                    td.className = classItems
                    td.width = '75';
                    td.appendChild(document.createTextNode(`Cant`));
                    tr.appendChild(td);
                    //Add item
                    td = document.createElement('TH');
                    td.className = classItems
                    td.width = '12';
                    td.appendChild(document.createTextNode(`Viewer Id`));
                    tr.appendChild(td);
                    //add item
                    td = document.createElement('TH');
                    td.className = classItems
                    td.width = '75';
                    td.appendChild(document.createTextNode(`Valor`));
                    tr.appendChild(td);
                    tableBody.appendChild(tr);
                    subTotal = 0;
                    countdb = 0;
                    data.forEach(function (groupby, index) {
                        if (groupby.group == label) {
                            valorItem = groupby.valor;
                            subTotal += parseFloat(valorItem);
                            tr = document.createElement('TR');
                            td = document.createElement('TD');
                            td.className = classItems
                            td.width = '75';
                            td.appendChild(document.createTextNode(`${itemText}${label}`));
                            tr.appendChild(td);
                            td = document.createElement('TD');
                            td.className = classItems
                            td.width = '75';
                            td.appendChild(document.createTextNode(`1 Unit`));
                            tr.appendChild(td);
                            //Add item
                            td = document.createElement('TD');
                            td.className = classItems
                            td.width = '12';
                            let spanDbid = document.createElement('span');
                            spanDbid.onclick = () => isolateItems(`${groupby.dbid}`);
                            spanDbid.appendChild(document.createTextNode(`${item.dbid}`));
                            td.appendChild(spanDbid);
                            tr.appendChild(td);
                            //add item
                            td = document.createElement('TD');
                            td.className = classItems
                            td.width = '75';
                            td.appendChild(document.createTextNode(`${valorItem}`));
                            tr.appendChild(td);
                            tableBody.appendChild(tr);
                            countdb += 1;
                        }
                    });
                    totalCountdb += countdb;
                    total += subTotal;
                    tr = document.createElement('TR');
                    td = document.createElement('TD');
                    td.className = classItems
                    td.width = '75';
                    td.appendChild(document.createTextNode(`Subtotal Items`));
                    tr.appendChild(td);
                    td = document.createElement('TD');
                    td.className = classItems
                    td.width = '75';
                    td.appendChild(document.createTextNode(`${countdb} Unit`));
                    tr.appendChild(td);
                    //Add item
                    td = document.createElement('TD');
                    td.className = classItems
                    td.width = '12';
                    tr.appendChild(td);
                    //add item
                    td = document.createElement('TD');
                    td.className = classItems
                    td.width = '75';
                    td.appendChild(document.createTextNode(`${subTotal.toFixed(2)}`));
                    tr.appendChild(td);
                    tableBody.appendChild(tr);

                    dataChart.push(subTotal);
                }
                tr = document.createElement('TR');
                td = document.createElement('TH');
                td.className = classItems
                td.width = '75';
                td.appendChild(document.createTextNode(`Total Items`));
                tr.appendChild(td);
                td = document.createElement('TH');
                td.className = classItems
                td.width = '75';
                td.appendChild(document.createTextNode(`${totalCountdb} Unit`));
                tr.appendChild(td);
                //Add item
                td = document.createElement('TD');
                td.className = classItems
                td.width = '12';
                tr.appendChild(td);
                //add item
                td = document.createElement('TH');
                td.className = classItems
                td.width = '75';
                td.appendChild(document.createTextNode(`${total.toFixed(2)}`));
                tr.appendChild(td);
                tableBody.appendChild(tr);
                table.appendChild(tableBody);
                tableRef.current.appendChild(table);
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
        } else {

        }
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
                let item = modelProperties.familyType.find(x => x.dbid.toString() == selectedFamilyType.toString());
                dbids = item.childrens;
                childsTypes = [];
                childsTypes.push({ name: item.categoryName, childs: dbids });
            }
            let customItems = [];
            tableRef.current.innerHTML = "";
            let table = document.createElement('TABLE');
            table.className = "min-w-full divide-y divide-gray-200 dark:divide-gray-700";
            table.border = '1';
            let tableBody = document.createElement('TBODY');
            let td = "";
            let valorItem = 0;
            let tr = "";
            let classItems = "border px-6 py-3 text-left text-xs";
            childsTypes.map((propertys, index) => {
                let items = modelProperties.items.filter(item => propertys.childs.includes(item.dbid));
                if (index == 0) {
                    selectTtemDbRef.current.innerHTML = `<option className='text-xs' value="">Select the Dimension</option>${items[0].props.filter(x => x.type == 3).map((x) => x.displayName).map((item) => (`<option className='text-xs' value="${item}">${item}</option>`)).join('\n')}`;
                    selectTtemGroupDbRef.current.innerHTML = `<option className='text-xs' value="">Select the Group</option>${items[0].props.filter(x => x.type == 20).map((x) => x.displayName).map((item) => (`<option className='text-xs' value="${item}">${item}</option>`)).join('\n')}`
                }
                if (items.length > 0) {
                    let evalProp = null;
                    customItems = [...customItems, ...items];
                    let itemText = "";
                    itemText += selectedCategory !== "" ? `${modelProperties.categorys.find(x => x.dbid == parseInt(selectedCategory)).categoryName}>` : "";
                    itemText += selectedFamily !== "" ? `${modelProperties.family.find(x => x.dbid == parseInt(selectedFamily)).categoryName}>` : "";
                    itemText += selectedFamilyType !== "" ? `${modelProperties.familyType.find(x => x.dbid == parseInt(selectedFamilyType)).categoryName}` : "";
                    tr = document.createElement('TR');
                    td = document.createElement('TH');
                    td.className = classItems
                    td.width = '75';
                    td.appendChild(document.createTextNode(`${itemText}`));
                    tr.appendChild(td);
                    td = document.createElement('TH');
                    td.className = classItems
                    td.width = '75';
                    td.appendChild(document.createTextNode(`Cant`));
                    tr.appendChild(td);
                    //Add item
                    td = document.createElement('TH');
                    td.className = classItems
                    td.width = '12';
                    td.appendChild(document.createTextNode(`Viewer Id`));
                    tr.appendChild(td);
                    //add item
                    td = document.createElement('TH');
                    td.className = classItems
                    td.width = '75';
                    td.appendChild(document.createTextNode(`Valor`));
                    tr.appendChild(td);
                    tableBody.appendChild(tr);
                    items.forEach(function (item, index) {
                        evalProp = item.props.find(x => x.displayName == (selectedItemdb !== "" ? selectedItemdb : "Area"));
                        valorItem = typeof evalProp !== "undefined" ? Number(evalProp.displayValue.toFixed(2)) : 0;
                        subTotal += valorItem;
                        tr = document.createElement('TR');
                        td = document.createElement('TD');
                        td.className = classItems
                        td.width = '75';
                        td.appendChild(document.createTextNode(`${itemText} ${item.categoryName}`));
                        tr.appendChild(td);
                        td = document.createElement('TD');
                        td.className = classItems
                        td.width = '75';
                        td.appendChild(document.createTextNode(`1 Unit`));
                        tr.appendChild(td);
                        //Add item
                        td = document.createElement('TD');
                        td.className = classItems
                        td.width = '12';
                        let spanDbid = document.createElement('span');
                        spanDbid.onclick = () => isolateItems(`${item.dbid}`);
                        spanDbid.appendChild(document.createTextNode(`${item.dbid}`));
                        td.appendChild(spanDbid);
                        tr.appendChild(td);
                        //add item
                        td = document.createElement('TD');
                        td.className = classItems
                        td.width = '75';
                        td.appendChild(document.createTextNode(`${valorItem}`));
                        tr.appendChild(td);
                        tableBody.appendChild(tr);
                    });
                    tr = document.createElement('TR');
                    td = document.createElement('TD');
                    td.className = classItems
                    td.width = '75';
                    td.appendChild(document.createTextNode(`Subtotal Items`));
                    tr.appendChild(td);
                    td = document.createElement('TD');
                    td.className = classItems
                    td.width = '75';
                    td.appendChild(document.createTextNode(`${items.length} Unit`));
                    tr.appendChild(td);
                    //Add item
                    td = document.createElement('TD');
                    td.className = classItems
                    td.width = '12';
                    tr.appendChild(td);
                    //add item
                    td = document.createElement('TD');
                    td.className = classItems
                    td.width = '75';
                    td.appendChild(document.createTextNode(`${subTotal.toFixed(2)}`));
                    tr.appendChild(td);
                    tableBody.appendChild(tr);
                }
                dataBarArea.data.push(subTotal);
                total += subTotal;
                //dataBarVolumen.data.push(totalVol);
            });
            tr = document.createElement('TR');
            td = document.createElement('TH');
            td.className = classItems
            td.width = '75';
            td.appendChild(document.createTextNode(`Total Items`));
            tr.appendChild(td);
            td = document.createElement('TH');
            td.className = classItems
            td.width = '75';
            td.appendChild(document.createTextNode(`${customItems.length} Unit`));
            tr.appendChild(td);
            //Add item
            td = document.createElement('TH');
            td.className = classItems
            td.width = '12';
            tr.appendChild(td);
            //add item
            td = document.createElement('TH');
            td.className = classItems
            td.width = '75';
            td.appendChild(document.createTextNode(`${total.toFixed(2)}`));
            tr.appendChild(td);
            tableBody.appendChild(tr);
            table.appendChild(tableBody);
            tableRef.current.appendChild(table);
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

    //Used to detect if load Autodesk
    useEffect(() => {
        if (scriptLoaded && !initialized) {
            let options = {
                env: 'AutodeskProduction',
                getAccessToken: getAccessToken
            };
            Autodesk.Viewing.Initializer(options, function () { setInitialized(true); });

        }
    }, [initialized, scriptLoaded]);
    //loadAutodesk
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
                        console.log(modelProperties);
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
                        viewer.loadExtension('Autodesk.Explode');
                        viewer.loadExtension('Autodesk.DocumentBrowser');
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
                    viewer.setLightPreset(0);
                    Autodesk.Viewing.Document.load('urn:' + urn, onDocumentLoadSuccess, onDocumentLoadFailure);
                    setViewer3D(viewer);
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
            <Script src="https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.js" onLoad={() => setScriptLoaded(true)} />
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js" />
            {/* <!-- //extensions -->
            <!-- planesviewer --> */}
            <link rel="stylesheet" href="http://cdn.jsdelivr.net/gh/autodesk-forge/forge-extensions/public/extensions/NestedViewerExtension/contents/main.css" as="style" />
            <Script strategy="afterInteractive" src="http://cdn.jsdelivr.net/gh/autodesk-forge/forge-extensions/public/extensions/NestedViewerExtension/contents/main.js"></Script>
            {/* <!-- summaryExt --> */}
            <Script type="module" crossorigin="anonymous" strategy="afterInteractive" src="/extensions/summary/LoggerExtension.js"></Script>
            {/* <!-- histograma --> */}
            <Script type="module" crossorigin="anonymous" strategy="afterInteractive" src="extensions/Histograms/HistogramExtension.js"></Script>
            <script src="https://cdnjs.com/libraries/Chart.js"></script>
            {({ docUrn }) ? (
                <div className="grid">
                    <div className="h-[2.5vh]">
                        <label htmlFor="cbCategoria" className="text-xs basis-1/4 pr-2">Categoria: </label>
                        <select id="cbCategoria" className='text-xs' name="Categorys" ref={selectCategorysRef} onChange={e => handleCategorysSelect(e)} value={selectedCategory}><option className='text-xs' value="">Select the category</option></select>
                        <label htmlFor="cbFamily" className="text-xs basis-1/4 pr-2">Familia: </label>
                        <select id="cbFamily" className='text-xs' name="Familys" ref={selectFamilysRef} onChange={e => handleFamilysSelect(e)} value={selectedFamily}><option className='text-xs' value="">Select the Family</option></select>
                        <label htmlFor="cbFamilysTypes" className="text-xs basis-1/4 pr-2">Tipo: </label>
                        <select id="cbFamilysTypes" className='text-xs' name="FamilyTypes" ref={selectFamilyTypesRef} onChange={e => handleFamilyTypesSelect(e)} value={selectedFamilyType}><option className='text-xs' value="">Select the FamilyType</option></select>
                    </div>
                    <div className="h-[2.5vh]">
                        <label htmlFor="cbitemdb" className="text-xs basis-1/4 pr-2">Agrupar por: </label>
                        <select id="cbitemdb" className='text-xs' name="cbitemdb" ref={selectTtemGroupDbRef} onChange={e => handleItemGroupdbSelect(e)} value={selectedGroupItemdb}><option className='text-xs' value="">Select the Group</option></select>
                        <label htmlFor="cbDimesion" className="text-xs basis-1/4 pr-2">Dimension: </label>
                        <select id="cbDimesion" className='text-xs' name="cbDimesion" ref={selectTtemDbRef} onChange={e => handleItemdbSelect(e)} value={selectedItemdb}><option className='text-xs' value="">Select the Dimension</option></select>
                        <label htmlFor="cbFilter" className="text-xs basis-1/4 pr-2">Filter: </label>
                        <select id="cbFilter" className='text-xs' name="cbFilter" ref={selectFilterDbRef} onChange={e => handleFilterDbSelect(e)} value={selectedFilterDb}><option className='text-xs' value="">Select the Filter</option></select>
                    </div>
                    <div className="h-[82vh] grid"><div id="viewer" ref={viewer3DRef}></div></div>
                    <div id="ChartContainer" className="chart-container overflow-auto mt-16" style={{ zIndex: "3", position: 'absolute', width: "35em", height: '18em', backgroundColor: "White", display: "none", padding: '1px' }}>
                        <span className="float-right rounded-md bg-slate-400" onClick={() => { document.getElementById("ChartContainer").style.display = "none" }}>X</span>
                        {/* remove !hidden if you need a Graphic */}
                        <div className="docking-panel-title">Property Histogram</div>
                        <canvas ref={chartBarRef} className="chart mt-2 !hidden"></canvas>
                        <canvas ref={chartBarCustomRef} className="chart mt-2 !hidden"></canvas>
                        <div ref={tableRef} id="myDynamicTable"></div>
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