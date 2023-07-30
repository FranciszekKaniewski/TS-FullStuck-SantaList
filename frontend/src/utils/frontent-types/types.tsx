
export enum Color  {
    white = "#ffffff",
    red = '#c28080',
    green = '#a2d9a2',
}

export interface PopUpDeps{
    title:string;
    description?:string;
    color?:Color;
}

export interface PopUpProps extends PopUpDeps{
    turnOffFn:()=>void;
}