Vue.component("queues", {
    template: `
    <div>
        <h2>Queue Message Counts</h2>
        <div class="table-responsive">
            <table class="table table-striped table-sm">
                <thead>
                <tr>
                    <th>Queue Name</th>
                    <th>Message Count</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="item in queues">
                        <td>{{ item.name }}</td>
                        <td>{{ item.count }}</td>                                           
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `,
    data: function(){
        return {
            queues: [
                {name: "errors.DWH.RavenHandlers.Admin", count: "1000000"},
                {name: "errors.DWH.RavenHandlers.ExactTarget", count: ":shrug:"}
            ]
        }
    }
});