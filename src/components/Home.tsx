import React from "react";
import Header from "./Header";

export default function Home() {
    return(
        <>
            <Header/>
            <h1>BSSM Ranking</h1>
            <section>
                <div className="topranking">
                    <div className="top2"></div>
                    <div className="top1"></div>
                    <div className="top3"></div>
                </div>

                <div className="ranking">

                </div>
            </section>

        </>
    );
}