import React, {Component} from 'react'

import {Form, Tabs, Tab} from 'react-bootstrap'

import "./searchbar.css"

class SearchBar extends Component {
    constructor (){
        super ()
        this.state = {
            name: "",
            minParticipants: null,
            maxParticipants: null,
            owner: "",
            startTime: undefined,
            activeTimeLabel: null,
            distanceFromLocation: null,
            showFilters: false
        }
    }
    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value })
        this.props.filterEvents({ ...this.state, [e.target.name]: e.target.value })
    }
    handleDateInputsChange = e => {
        e.target.value === "today" && this.sendOneDayValue(e, 0)
        e.target.value === "tomorrow" && this.sendOneDayValue(e, 1)
        e.target.value === "weekend" && this.sendWeekendValue(e)
        e.target.value === "week" && this.sendWeekValue(e)
        e.target.value === "all" && this.sendEmptyValue(e)
        this.setState({activeTimeLabel: e.target.value})
    }
    sendOneDayValue = (e, offset) => {
        let day = new Date()
        day = day.setDate(day.getDate() + offset)
        this.setState({ startTime: e.target.value })
        this.props.filterEvents({ ...this.state, minDay: day, maxDay: day })
    }
    sendEmptyValue = e => this.props.filterEvents({ ...this.state, minDay: null, maxDay: null })
    sendWeekendValue = e => {
        let weekendDays = []
        for (let i = 0; i <= 6; i++) {
            let day = new Date()
            day = new Date(day.setDate(day.getDate() + i))

            if(day.getDay() === 0 || day.getDay() === 6) weekendDays.push(day) 
        }
        this.setState({ startTime: e.target.value })
        this.props.filterEvents({ ...this.state, minDay: weekendDays[0], maxDay: weekendDays[1] })
    }
    sendWeekValue = e => {
        let weekDays = []
        for (let i = 0; i <= 6; i++) {
            let day = new Date()
            weekDays.push(new Date(day.setDate(day.getDate() + i)))
            if (day.getDay() === 0) break
        }
        this.setState({ startTime: e.target.value })
        this.props.filterEvents({ ...this.state, minDay: weekDays[0], maxDay: weekDays[weekDays.length - 1] })
    }

    handleTags = e => {
        const stateToChange = [...this.state[e.target.name]]
        const index = stateToChange.indexOf(e.target.value)
        index === -1 ? stateToChange.push(e.target.value) : stateToChange.splice(index, 1)
        this.setState({ [e.target.name]: stateToChange })     
        this.props.filterEvents({ ...this.state, [e.target.name]: stateToChange })
    }
    render () {
        return (
            <Form>
                <Form.Group className="main-search-bar" >
                <span role = "img" aria-label = "magnifying glass" > 🔍</span>
                    <Form.Control placeholder="Search an event" onChange={this.handleInputChange} value={this.state.name} name="name" type="text" className="main-input" />
                    <p className="show-filter-button" onClick={() => this.setState({ showFilters: !this.state.showFilters })}>Show Filters</p>
                </Form.Group> 
                {this.state.showFilters &&
                    <div className="tab-container">
                        <Tabs defaultActiveKey="none" transition={false} id="noanim-tab-example">
                        <Tab eventKey="when" title="When">
                            < div className = "navbar-filters-dimensions" >
                                <Form.Label className="tabs-main-title">Date</Form.Label>
                                    <Form.Group>
                                        <Form.Label className={`btn btn-black btn-primary ${this.state.activeTimeLabel === "today" && "active"}`} htmlFor="today">Today</Form.Label>
                                        <Form.Control className="hidden-radio" onChange={this.handleDateInputsChange} id="today" value="today" checked={this.state.startTime === "today"} name="startTime" type="radio" />
                                        <Form.Label className={`btn btn-black btn-primary ${this.state.activeTimeLabel === "tomorrow" && "active"}`} htmlFor="tomorrow">Tomorrow</Form.Label>
                                        <Form.Control className="hidden-radio" onChange={this.handleDateInputsChange} id="tomorrow" value="tomorrow" checked={this.state.startTime === "tomorrow"} name="startTime" type="radio" />
                                        <Form.Label className={`btn btn-black btn-primary ${this.state.activeTimeLabel === "weekend" && "active"}`} htmlFor="weekend">This weekend</Form.Label>
                                        <Form.Control className="hidden-radio" onChange={this.handleDateInputsChange} id="weekend" value="weekend" checked={this.state.startTime === "weekend"} name="startTime" type="radio" />
                                        <Form.Label className={`btn btn-black btn-primary ${this.state.activeTimeLabel === "week" && "active"}`} htmlFor="week">This week</Form.Label>
                                        <Form.Control className="hidden-radio" onChange={this.handleDateInputsChange} id="week" value="week" checked={this.state.startTime === "week"} name="startTime" type="radio" />
                                        <Form.Label className={`btn btn-black btn-primary ${this.state.activeTimeLabel === "all" && "active"}`} htmlFor="all">All</Form.Label>
                                        <Form.Control className="hidden-radio" onChange={this.handleDateInputsChange} id="all" value="all" checked={this.state.startTime === "all"} name="startTime" type="radio" />
                                </Form.Group>
                            </div>
                        </Tab>
                        <Tab eventKey="who" title="Who">
                            <div className="navbar-filters-dimensions">
                                <Form.Group className="col-md-3 input-limit-width-sm">
                                    <Form.Label className="tabs-main-title">Creator</Form.Label>
                                    <Form.Control onChange={this.handleInputChange} value={this.state.owner} name="owner" type="text" />
                                </Form.Group>
                                <Form.Group className="col-md-3 input-limit-width-sm">
                                <Form.Label className="tabs-main-title">Min participants</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.minParticipants} name="minParticipants" type="number" />
                                </Form.Group>
                                <Form.Group className="col-md-3 input-limit-width-sm">
                                    <Form.Label className="tabs-main-title">Max participants</Form.Label>
                                    <Form.Control onChange={this.handleInputChange} value={this.state.maxParticipants} name="maxParticipants" type="number" />
                                </Form.Group>
                            </div>
                        </Tab>
                        <Tab eventKey="Where" title="Where" >
                            < div className = "navbar-filters-dimensions" >
                                <Form.Group className="col-md-6 input-limit-width-sm">
                                    <Form.Label className="tabs-main-title">Distance from you</Form.Label>
                                        <Form.Group>
                                            <Form.Label className={`btn btn-black btn-primary ${this.state.distanceFromLocation === "1" && "active"}`} htmlFor="1">1 km</Form.Label>
                                            <Form.Control className="hidden-radio" onChange={this.handleInputChange} id="1" value="1" checked={this.state.distanceFromLocation === "1"} name="distanceFromLocation" type="radio" />
                                            <Form.Label className={`btn btn-black btn-primary ${this.state.distanceFromLocation === "5" && "active"}`} htmlFor="5">5 km</Form.Label>
                                            <Form.Control className="hidden-radio" onChange={this.handleInputChange} id="5" value="5" checked={this.state.distanceFromLocation === "5"} name="distanceFromLocation" type="radio" />
                                            <Form.Label className={`btn btn-black btn-primary ${this.state.distanceFromLocation === "10" && "active"}`} htmlFor="10">10 km</Form.Label>
                                            <Form.Control className="hidden-radio" onChange={this.handleInputChange} id="10" value="10" checked={this.state.distanceFromLocation === "10"} name="distanceFromLocation" type="radio" />
                                            <Form.Label className={`btn btn-black btn-primary ${this.state.distanceFromLocation === "20" && "active"}`} htmlFor="20">20 km</Form.Label>
                                        <Form.Control className="hidden-radio" onChange={this.handleInputChange} id="20" value="20" checked={this.state.distanceFromLocation === "20"} name="distanceFromLocation" type="radio" />
                                         <Form.Label className={`btn btn-black btn-primary ${this.state.distanceFromLocation === "allDistance" && "active"}`} htmlFor="allDistance">All</Form.Label>
                                        <Form.Control className="hidden-radio" onChange={this.handleInputChange} id="allDistance" value="allDistance" checked={this.state.distanceFromLocation === "allDistance"} name="distanceFromLocation" type="radio" />
                                        </Form.Group>
                                </Form.Group>
                            </div>
                        </Tab>
                        </Tabs>
                    </div>
                }
            </Form>
        )
    }
}

export default SearchBar