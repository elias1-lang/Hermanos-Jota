import React from 'react';

import BaseHeader from "../components/BaseHeader";
import BaseFooter from "../components/BaseFooter";
import BaseMenu from "../components/BaseMenu";
import IndexNosotros from "../components/index/IndexNosotros";

export default function Nosotros(){
    return (
        <React.Fragment>
            <BaseHeader />
            <IndexNosotros />
            <BaseFooter />
            <BaseMenu />
        </React.Fragment>
    );
}
