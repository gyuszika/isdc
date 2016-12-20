function editItem() {
    $("#myTbody td").click(function (e) {
        e.preventDefault(); // <-- consume event
        e.stopImmediatePropagation();
        
        $this = $(this);

        if ($this.data('editing')) return;  
        
        var val = $this.text();
        
        $this.empty()
        $this.data('editing', true);        
        
        $('<input type="text" class="editfield">').val(val).appendTo($this);
    });

    putOldValueBack = function () {
        $("#myTbody .editfield").each(function(){
            $this = $(this);
            var val = $this.val();
            var td = $this.closest('td');
            td.empty().html(val).data('editing', false);
            
        });
    }

    $(document).click(function (e) {
        putOldValueBack();
    });
}