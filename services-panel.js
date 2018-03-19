Vue.component("services", {
    template: `
    <div>
        <h2>Service Statuses</h2>
        <div class="table-responsive">
            <table class="table table-striped table-sm">
                <thead>
                <tr>
                    <th>Service Name</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="item in services">
                        <td>{{ item.name }}</td>
                        <td>{{ item.status }}</td>                                           
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `,
    data: function(){
        return {
            services: [
                {name: "DWH.RavenHandlers.Admin", status: "up"},
                {name: "DWH.RavenHandlers.ExactTarget", status: "down"}
            ]
        }
    }
});