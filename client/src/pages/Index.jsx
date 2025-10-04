import React from 'react';

import BaseHeader from "../components/BaseHeader";
import BaseFooter from "../components/BaseFooter";
import BaseMenu from "../components/BaseMenu";
import IndexMain from "../components/index/IndexMain";

export default function Index(){
    return (
        <React.Fragment>
            <BaseHeader />
            <IndexMain />
            <BaseFooter />
            <BaseMenu />
        </React.Fragment>
    );
}