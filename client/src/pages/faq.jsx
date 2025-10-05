import React from 'react';

import BaseHeader from "../components/BaseHeader";
import BaseFooter from "../components/BaseFooter";
import BaseMenu from "../components/BaseMenu";
import IndexFAQ from "../components/index/IndexFAQ";

export default function faq(){
    return (
        <React.Fragment>
            <BaseHeader />
            <IndexFAQ />
            <BaseFooter />
            <BaseMenu />
        </React.Fragment>
    );
}
