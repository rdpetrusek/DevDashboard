'use strict';
var app = new Vue({
    el: '#app',
    data:{
        integrities:[
            new Integrity("Showcase Price", "website", ":thumbs up:", "success"),
            new Integrity("Showcase Missing", "website", "9000+ missing showcases", "high"),
            new Integrity("Website is down", "website", "www.davidweekleyhomes.com is unavailable", "critical"),
            new Integrity("Showcase Media Missing", "website", "100,000 missing pictures", "medium")
        ],
        services: [
            {name: "DWH.RavenHandlers.Admin", status: "up"},
            {name: "DWH.RavenHandlers.ExactTarget", status: "down"}
        ],
        queues: [
            {name: "errors.DWH.RavenHandlers.Admin", count: "1000000"},
            {name: "errors.DWH.RavenHandlers.ExactTarget", count: ":shrug:"}
        ],
        active_tab: "integrities",
        integrities_severity_filter: "all",
        integrities_subsystem_filter: "all"
    },
    methods: {
        showIntegrities: function(){
            this.active_tab = "integrities";
        },
        showServices: function(){
            this.active_tab = "services";
        },
        showAvailability: function(){
            this.active_tab = "availability";
        },
        showQueues: function(){
            this.active_tab = "queues";
        }
    },
    computed:{
        sorted_filtered_integrities: function(){
            var filteredIntegrities = this.integrities;

            if(this.integrities_severity_filter !== "all")
                filteredIntegrities = filteredIntegrities.filter(x => x.severity === this.integrities_severity_filter);

            if(this.integrities_subsystem_filter !== "all")
                filteredIntegrities = filteredIntegrities.filter(x => x.subsystem === this.integrities_subsystem_filter);

            return filteredIntegrities.sort((a, b) => {
                if(a.SeverityOrder < b.SeverityOrder) return 1;
                if(a.SeverityOrder > b.SeverityOrder) return -1;
                return 0;
            });
        },
        integrities_subsystems: function(){
            var allSubsystems = this.integrities.map(x => x.subsystem);

            // filter out duplicates
            return allSubsystems.filter((x, i, a) => a.indexOf(x) == i);
        },
        integrities_severities: function(){
            var allSeverities = this.integrities.map(x => x.severity);
            
            // filter out duplicates
            return allSeverities.filter((x, i, a) => a.indexOf(x) == i);
        },
        integrity_criticals: function(){
            return this.integrities.filter(x => x.IsCritical).length;
        },
        integrity_highs: function(){
            return this.integrities.filter(x => x.IsHigh).length;
        },
        integrity_mediums: function(){
            return this.integrities.filter(x => x.IsMedium).length;
        },
        integrity_successes: function(){
            return this.integrities.filter(x => x.IsSuccessful).length;
        },
        is_integrities_active: function(){
            return this.active_tab === 'integrities';
        },
        is_services_active: function(){
            return this.active_tab === 'services';
        },
        is_availability_active: function(){
            return this.active_tab === 'availability';
        },
        is_queues_active: function(){
            return this.active_tab === 'queues';
        }
    }
});

Vue.Component('nav-item', {

});

function Integrity (name, subsystem, description, severity) {
    var severityOrder = {
        critical: 10,
        high: 9,
        medium: 8,
        success: 7
    }
    this.IsCritical = severity === "critical";
    this.IsHigh = severity === "high";
    this.IsMedium = severity === "medium";
    this.IsSuccessful = severity === "success";
    this.SeverityOrder = severityOrder[severity];

    this.name = name;
    this.subsystem = subsystem;
    this.description = description;
    this.severity = severity;

    this.IsMySubsystem = function IsMySubSystem(subsystem){
        return subsystem === this.subsystem;
    }
}