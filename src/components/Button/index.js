import React from "react";
import "./style.scss";

export default function Button({type = "", text, onClick, className = ''}) {
    return (
        <button className={`btn ${type} ${className}`} {...(onClick ? {onClick} : {})}>
            {text}
        </button>
    );
}
