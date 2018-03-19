Vue.component("integrities", {
    template: `
    <div class="integrities-panel">
        <h1>Integrities</h1><hr />
        <div class="row integrity-filters">
            <div class="col">
                <label for="severities-select-list">Severity:</label>
                <select class="form-control" id="severities-select-list" v-model="severity_filter">
                    <option selected>all</option>
                    <option v-for="item in severities">{{ item }}</option>
                </select>
            </div>
            <div class="col">
                <label for="subsystem-select-list">Subsystem:</label>
                <select class="form-control" id="subsystem-select-list" v-model="subsystem_filter">
                    <option selected>all</option>
                    <option v-for="item in subsystems">{{ item }}</option>
                </select>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-sm">
                <thead>
                <tr>
                    <th class="d-md-table-cell d-none">Severity</th>
                    <th class="d-lg-table-cell d-none">Subsystem</th>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="item in sorted_filtered" v-bind:class="{ 'severity-critical' : item.IsCritical, 'severity-high': item.IsHigh, 'severity-medium': item.IsMedium, 'severity-success': item.IsSuccessful}">
                        <td class="d-md-table-cell d-none">{{ item.severity }}</td>                                           
                        <td class="d-lg-table-cell d-none">{{ item.subsystem }}</td>                         
                        <td>{{ item.name }}</td>
                        <td>{{ item.description }}</td>                                      
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `,
    data: function(){
        return {
        severity_filter: "all",
        subsystem_filter: "all",
        integrities:[
            new Integrity("Showcase Price", "website", "", "success"),
            new Integrity("Showcase Missing", "website", "9000+ missing showcases", "high"),
            new Integrity("Website is down", "website", "www.davidweekleyhomes.com is unavailable", "critical"),
            new Integrity("Showcase Media Missing", "website", "100,000 missing pictures", "medium")
        ]}
    },
    computed:{
        sorted_filtered: function(){
            var filteredIntegrities = this.integrities;

            if(this.severity_filter !== "all")
                filteredIntegrities = filteredIntegrities.filter(x => x.severity === this.severity_filter);

            if(this.subsystem_filter !== "all")
                filteredIntegrities = filteredIntegrities.filter(x => x.subsystem === this.subsystem_filter);

            return filteredIntegrities.sort((a, b) => {
                if(a.SeverityOrder < b.SeverityOrder) return 1;
                if(a.SeverityOrder > b.SeverityOrder) return -1;
                return 0;
            });
        },
        subsystems: function(){
            var allSubsystems = this.integrities.map(x => x.subsystem);

            // filter out duplicates
            return allSubsystems.filter((x, i, a) => a.indexOf(x) == i);
        },
        severities: function(){
            var allSeverities = this.integrities.map(x => x.severity);
            
            // filter out duplicates
            return allSeverities.filter((x, i, a) => a.indexOf(x) == i);
        },
        criticals: function(){
            return this.integrities.filter(x => x.IsCritical).length;
        },
        highs: function(){
            return this.integrities.filter(x => x.IsHigh).length;
        },
        mediums: function(){
            return this.integrities.filter(x => x.IsMedium).length;
        },
        successes: function(){
            return this.integrities.filter(x => x.IsSuccessful).length;
        }
    }
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