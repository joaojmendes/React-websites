import * as React from 'react';
import { IWebSitesProps } from './IWebSitesProps';
export default class WebSites extends React.Component<IWebSitesProps, any> {
    constructor(props: IWebSitesProps);
    private getColor();
    private _loadWebSites();
    componentDidMount(): void;
    render(): JSX.Element;
    private addSubSite(_webUrl);
}
