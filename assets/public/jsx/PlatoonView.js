React = require("react")

ReactView = {};
module.exports = ReactView;

ReactView.init = function(actions, platoonsStore, elem){

    var PlatoonUserRow = React.createClass({displayName: 'PlatoonUserRow',
        render: function() {
            return React.createElement("li", null, this.props.user.name)
        }
    });


    var PlatoonsView = React.createClass({displayName: 'PlatoonsView',
        getInitialState: function () {
            return platoonsStore.getDefaultState();
        },
        handleChangePlatoon: function(e){
            e.preventDefault();
            var platoon = this.refs.platoon.getDOMNode().value.trim();
            actions.platoonChange(platoon)
        },
        onPlatoonChange: function(platoon){
            this.setState({
                currentPlatoon: platoon
            });
        },
        componentDidMount: function() {
            this.unsubscribe = platoonsStore.listen(this.onPlatoonChange);
            //this.unsubscribe = platoonsStore.listenTo(this.onPlatoonChange);
            //this.listenTo(platoonsStore, this.onPlatoonChange);
        },
        componentWillUnmount: function() {
            this.unsubscribe();
        },
        render: function() {
            var users = _.map(this.state.currentPlatoon.users, function(user){
                return React.createElement(PlatoonUserRow, {key: user.name, user: user});
            });

            return (
                React.createElement("div", {className: "platoonsBox"}, 
                    "Hello, world! Platoonizar goes here.", 
                    React.createElement("span", null, this.state.currentPlatoon.name), 

                    React.createElement("select", {id: "select-platoon", onChange: this.handleChangePlatoon, ref: "platoon"}, 
                        this.props.platoons.map(function(platoon) {
                            return React.createElement("option", {value: platoon.id}, platoon.name)
                        })
                    ), 

                    React.createElement("ul", null, users)
                )
            );
        }
    });

    React.render(
        React.createElement(PlatoonsView, {platoons: platoonsStore.getDefaultProps()}),
        elem
    );
}
