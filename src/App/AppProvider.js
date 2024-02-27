import React from 'react';

const cc = require('cryptocompare');
cc.setApiKey('<aab961a72f7f7aa572595ffa8cfb1dfb8c4ff10decca80b8e5f3596d2e9997ec>')

export const AppContext = React.createContext();
export class AppProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page:'dashboard',
            ...this.savedSettings(),
            setPage: this.setPage,
            confirmFavorites: this.confirmFavorites
        }
    }

    componentDidMount = () => {
         this.fetchCoins();
    }

    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList});
    }
    confirmFavorites = () => {
        this.setState({
            firstVisit: false,
            page: 'dashboard'
        });
        localStorage.setItem('cryptoDash', JSON.stringify({
            test: 'hello again'
        }));
    }

    savedSettings(){
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if(!cryptoDashData){
            return {page: 'settings', firstVisit: true}
        }
        return {};
    }
 setPage = page => this.setState({page})
 render(){
    return (
        <AppContext.Provider value={this.state}>
            {this.props.children}
        </AppContext.Provider>
    )
 }

}