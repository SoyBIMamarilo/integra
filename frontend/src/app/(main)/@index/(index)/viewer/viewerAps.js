

"use client";

import { useEffect, useRef, useState } from "react";
import Script from 'next/script'
//import './extensions/summary/LoggerExtension.js';
const ViewerAps = (params) => {
    console.log("dsddsdsd");
    let { docUrn, api, handleChangeToken } = params;
    const [viewer3D, setViewer3D] = useState(null);
    const [token, setToken] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const viewer3DRef = useRef(null);
    const [scriptLoaded, setScriptLoaded] = useState(
        typeof window !== 'undefined' ? (window !== "undefined" && window.Autodesk?.Viewing?.Initializer !== undefined) : false
    );
    useEffect(() => {
        async function getAccessToken(callback) {
            try {
                const resp = await fetch('/api/aps/oauth/token');
                if (!resp.ok)
                    throw new Error(await resp.text());
                const { access_token, expires_in } = await resp.json();
                callback(access_token, expires_in);
            } catch (err) {
                //alert('Could not obtain access token. See the console for more details.');
                console.error("Could not obtain access token", err);
            }
        }
        if (scriptLoaded && !initialized) {
            let options = {
                env: 'AutodeskProduction',
                getAccessToken: getAccessToken
            };
            Autodesk.Viewing.Initializer(options, function () { setInitialized(true); console.log("load") });

        }
    }, [initialized, scriptLoaded]);
    useEffect(() => {
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
        if (scriptLoaded && initialized) {
            console.log("urn", docUrn);

            let options = {
                env: 'AutodeskProduction',
                getAccessToken: getAccessToken
            };
            Autodesk.Viewing.Initializer(options, () => {
                const config = {
                    extensions: ['Autodesk.DocumentBrowser', 'Autodesk.VisualClusters', "LoggerExtension", "HistogramExtension"]
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

                // if (!viewer2D) return
                // viewer2D.finish()
                // setViewer2D(null)

                Autodesk.Viewing.shutdown()
            }
        }
    }, [token, initialized, scriptLoaded, docUrn]);
    return (
        <>
            <Script async src="https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.js" onLoad={() => setScriptLoaded(true)} />
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js" />
            <Script src="https://unpkg.com/inspire-tree@4.3.1/dist/inspire-tree.js" />
            <Script src="https://unpkg.com/inspire-tree-dom@4.0.6/dist/inspire-tree-dom.min.js" />

            {/* <!-- //extensions -->
            <!-- planesviewer --> */}
            <link rel="stylesheet" href="http://cdn.jsdelivr.net/gh/autodesk-forge/forge-extensions/public/extensions/NestedViewerExtension/contents/main.css" />
            <Script strategy="afterInteractive" src="http://cdn.jsdelivr.net/gh/autodesk-forge/forge-extensions/public/extensions/NestedViewerExtension/contents/main.js"></Script>
            {/* <!-- summaryExt --> */}
            <Script type="module" crossorigin="anonymous" strategy="afterInteractive" src="/extensions/summary/LoggerExtension.js"></Script>
            {/* <!-- histograma --> */}
            <Script type="module" crossorigin="anonymous" strategy="afterInteractive" src="extensions/Histograms/HistogramExtension.js"></Script>

            {({ docUrn }) ? (
                <div id="viewer"
                    ref={viewer3DRef}
                ></div>
            ) : (
                <div> Plese include viewer3D.min.js to the index.html</div>
            )
            }
        </>
    )
}
export default ViewerAps