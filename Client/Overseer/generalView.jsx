"use strict";
import React from "react";

import CategoryBadge from "./categoryBadge.jsx";

export default class GeneralView extends React.Component
{
    render(){
        const categoryBadgeList = this.props.data.statuses.map(category => {
            const totalCount = category.statuses.length;
            const okCount = category.statuses.filter(i => i.status==="ok").length;
            const poorCount = category.statuses.filter(i => i.status==="poor").length;
            const alertCount = category.statuses.filter(i => i.status==="alert").length;
            return <CategoryBadge 
                key={category.type}
                type={category.type}
                okCount={okCount}
                poorCount={poorCount}
                alertCount={alertCount}
                totalCount={totalCount}
                SetDetailView={this.props.SetDetailView}
                 />;
        });

        return (
            <div style={{display:"flex", flexWrap:"wrap", width:"100%", height:"100%"}}>
                {categoryBadgeList}
            </div>
        );
    }
}