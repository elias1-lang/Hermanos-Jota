import React, { useState, useEffect, useRef } from 'react';

function ProductoModalImg() {
    const [isActive, setIsActive] = useState(false);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [zoomMode, setZoomMode] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [imageSrc, setImageSrc] = useState('');
    
    const modalRef = useRef(null);
    const modalImgRef = useRef(null);

    const imageElement = document.querySelector('#image');
        
    if (imageElement) {
        const handleImageClick = () => {
            setIsActive(true);
            setImageSrc(imageElement.src);
            setScale(1);
            setPosition({ x: 0, y: 0 });
            setZoomMode(false);
        };

        imageElement.addEventListener('click', handleImageClick);
        return () => imageElement.removeEventListener('click', handleImageClick);
    }

    const handleModalImgClick = (e) => {
        e.stopPropagation();
        if (!zoomMode) {
            setScale(2);
            setZoomMode(true);
        } else {
            setScale(1);
            setPosition({ x: 0, y: 0 });
            setZoomMode(false);
        }
    };

    const handleClose = () => {
        setIsActive(false);
        setScale(1);
        setPosition({ x: 0, y: 0 });
        setZoomMode(false);
    };

    const handleModalClick = (e) => {
        if (e.target === modalRef.current) {
            handleClose();
        }
    };

    const handleWheel = (e) => {
        if (!zoomMode) return;
        e.preventDefault();
        
        const newScale = e.deltaY < 0 
            ? Math.min(scale + 0.15, 3)
            : Math.max(scale - 0.15, 1.1);
        
        setScale(newScale);
    };

    const handleMouseDown = (e) => {
        if (!zoomMode) return;
        setIsDragging(true);
        setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !zoomMode) return;
        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, dragStart, zoomMode]);

    const getCursor = () => {
        if (!zoomMode) return 'zoom-in';
        return isDragging ? 'grabbing' : 'grab';
    };

    const getTransform = () => {
        return `scale(${scale}) translate(${position.x/scale}px, ${position.y/scale}px)`;
    };

    return (
        <div 
            id="modal-img" 
            className={`modal-img ${isActive ? 'active' : ''}`}
            ref={modalRef}
            onClick={handleModalClick}
        >
            <span className="modal-img-close" onClick={handleClose}>&times;</span>
            <img 
                ref={modalImgRef}
                id="modal-img-content" 
                src={imageSrc} 
                alt="Imagen ampliada"
                onClick={handleModalImgClick}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                style={{
                    transform: getTransform(),
                    cursor: getCursor()
                }}
            />
        </div>
    );
}

export default ProductoModalImg;