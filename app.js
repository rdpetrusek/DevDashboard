'use strict';

var app = new Vue({
    el: '#app',
    data:{
        active_tab: "integrities",
        nav_collapsed: false
    },
    methods: {
        showIntegrities: function(){
            this.active_tab = "integrities" || this.active_tab === undefined || this.active_tab === null;
        },
        showServices: function(){
            this.active_tab = "services";
        },
        showAvailability: function(){
            this.active_tab = "availability";
        },
        showQueues: function(){
            this.active_tab = "queues";
        },
        toggle_nav: function(event){
            if(this.nav_collapsed === true)
                this.nav_collapsed = false;
            else
                this.nav_collapsed = true;
        }
    },
    computed:{
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
        },
        is_nav_collapsed: function(){
            return this.nav_collapsed === true;
        },
        is_nav_expanded: function(){
            return this.nav_collapsed === false;
        }
    }
});