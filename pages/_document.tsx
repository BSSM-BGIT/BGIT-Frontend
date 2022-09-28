import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta property="title" content="BGIT" />
                    <meta property="og:title" content="GitHub & BOJ Ranking Service" />
                </Head>
                <body className="dark">
                    <Main />
                    <NextScript />
                    <div id="modal-wrap"/>
                    <div id="overlay-wrap"/>
                </body>
            </Html>
        );
    }
}