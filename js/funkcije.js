$(document).ready(function() {
            $("#dodajNovu").on('click', function () {
                $("#tableManager").modal('show');
            });

            $("#tableManager").on('hidden.bs.modal', function (){
               $("#showContent").fadeOut();
               $("#editContent").fadeIn();
               $("#editRowID").val(0);
               $("#opis").val("");
               $("#ocjena").val("");
               $("#naziv").val("");
               $("#manageBtn").attr('value', 'Dodaj novu').attr('onclick', "spremiPodatke('dodajNovu')");
               $("#manageBtn").show();
            });

            $("#dodajGlumca").on('click', function () {
                $("#tableManagerGlumac").modal('show');
            });

            $("#tableManagerGlumac").on('hidden.bs.modal', function (){
               $("#showContentGlumac").fadeOut();
               $("#editContentGlumac").fadeIn();
               $("#editRowIDGlumac").val(0);
               $("#nazivGlumca").val("");
               $("#glumacSerija").val("");
               $("#manageBtnGlumac").attr('value', 'Dodaj novog').attr('onclick', "spremiGlumca('dodajGlumca')");
               $("#manageBtnGlumac").show();
            });

            getExistingData(0, 10);
        });

        function deleteRow(rowID) {
            if (confirm('Jeste li sigurni?')) {
                $.ajax({
                    url: 'ajax.php',
                    method: 'POST',
                    dataType: 'text',
                    data: {
                        key: 'deleteRow',
                        rowID: rowID
                    }, success: function (response) {
                        $("#serije_"+rowID).parent().remove();
                        alert(response);
                        location.reload();
                    }
                });
            }
        }

        function viewORedit(rowID, type) {
            $.ajax({
                url: 'ajax.php',
                method: 'POST',
                dataType: 'json',
                data: {
                    key: 'getRowData',
                    rowID: rowID
                }, success: function (response) {
                    if (type == "view") {
                        $("#showContent").fadeIn();
                        $("#editContent").fadeOut();
                        $("#opisView").html(response.opis);
                        $("#ocjenaView").html(response.ocjena);
                        $("#nazivGlumcaView").html(response.nazivGlumca);
                        $("#manageBtn").hide();
                    } else {
                        $("#editContent").fadeIn();
                        $("#editRowID").val(rowID);
                        $("#showContent").fadeOut();
                        $("#naziv").val(response.naziv);
                        $("#opis").val(response.opis);
                        $("#manageBtn").attr('value', 'Spremi promjene').attr('onclick', "spremiPodatke('updateRow')");
                    }

                    $(".modal-title").html(response.naziv);
                    $("#tableManager").modal("show");
                }
            });
        }

        function getExistingData(start, limit) {
            $.ajax({
                url: 'ajax.php',
                method: 'POST',
                dataType: 'text',
                data: {
                    key: 'getExistingData',
                    start: start,
                    limit: limit
                }, success: function (response) {
                    if (response != "reachedMax") {
                        $('tbody').append(response);
                        start += limit;
                        getExistingData(start, limit);
                    } else
                        $(".table").DataTable();
                }
            });
        }

        function spremiPodatke(key) {
            var naziv = $("#naziv");
            var opis = $("#opis");
            var ocjena = $("#ocjena");
            var editRowID  = $("#editRowID");

            if (isNotEmpty(naziv)) {
                $.ajax({
                    url: 'ajax.php',
                    method: 'POST',
                    dataType: 'text',
                    data: {
                        key: key,
                        naziv: naziv.val(),
                        opis: opis.val(),
                        ocjena: ocjena.val(),
                        rowID: editRowID.val()
                    }, success: function (response) {
                        if (response != "success")
                            alert(response);
                        else {
                            $("#serije_"+editRowID.val()).html(naziv.val());
                            naziv.val('');
                            opis.val('');
                            ocjena.val('');
                            $("#tableManager").modal('hide');
                            $("#manageBtn").attr('value','Dodaj').attr('onclick',"spremiPodatke('dodajNovu')");
                            location.reload();
                        }
                    }
                });
            }
        }

        function spremiGlumca(key) {
            var nazivGlumca = $("#nazivGlumca");
            var spolGlumca = $("#spolGlumca");
            var datumRodenja = $("#datumRodenja");
            var glumacSerija = $("#glumacSerija")
            var editRowIDGlumac  = $("#editRowIDGlumac");

            if (isNotEmpty(nazivGlumca)) {
                $.ajax({
                    url: 'ajax.php',
                    method: 'POST',
                    dataType: 'text',
                    data: {
                        key: key,
                        nazivGlumca: nazivGlumca.val(),
                        spolGlumca: spolGlumca.val(),
                        datumRodenja: datumRodenja.val(),
                        glumacSerija: glumacSerija.val(),
                        rowID: editRowIDGlumac.val()
                    }, success: function (response) {
                        if (response != "success")
                            alert(response);
                        else {
                            $("#glumac_"+editRowIDGlumac.val()).html(nazivGlumca.val());
                            nazivGlumca.val('');
                            spolGlumca.val('');
                            datumRodenja.val('');
                            glumacSerija.val('');
                            $("#tableManagerGlumac").modal('hide');
                            $("#manageBtnGlumac").attr('value','Dodaj Glumca').attr('onclick',"spremiGlumca('dodajGlumca')");
                            location.reload();
                        }
                    }
                });
            }
        }

        function isNotEmpty(caller) {
            if (caller.val() == '') {
                caller.css("border", "1px solid red");
                return false;
            } 
            else   
                caller.css("border","");
            
            return true;
        }