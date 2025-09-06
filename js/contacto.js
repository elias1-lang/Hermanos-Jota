function configuracionesMenu(habilitacion){
            const selectorMenuHamb = document.querySelector(".menu_hamb");
            const selectorHeader = document.querySelector("header");
            const selectorFooter = document.querySelector("footer");
            const selectorContenido = document.querySelector(".base_main_envoltorio");

            if(habilitacion){
                selectorMenuHamb.classList.remove("menu_hamb_disable");
                selectorHeader.classList.add("disable_content");
                selectorFooter.classList.add("disable_content");
                selectorContenido.classList.add("disable_content");  
                return 1;
            }
            
            selectorMenuHamb.classList.add("menu_hamb_disable");
            selectorHeader.classList.remove("disable_content");
            selectorFooter.classList.remove("disable_content");
            selectorContenido.classList.remove("disable_content");
            return 1;
        }

        const selectorMenuBoton = document.querySelector(".base_menu");
        const selectorMenuDisable = document.querySelector(".menu_hamb_disable_bot");

        selectorMenuBoton.addEventListener('click', ()=>{configuracionesMenu(1)});
        selectorMenuDisable.addEventListener('click',()=>{configuracionesMenu(0)});