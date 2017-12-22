$(document).ready(function() {

            /* Table manager za unos serija */

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

            /* Table manager za unos glumaca */

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

            /* Table manager za unos TV kuce */

            $("#dodajTVkucu").on('click', function () {
                $("#tableManagerTVkuca").modal('show');
            });

            $("#tableManagerTVkuca").on('hidden.bs.modal', function (){
               $("#showContentTVkuca").fadeOut();
               $("#editContentTVkuca").fadeIn();
               $("#editRowIDTVkuca").val(0);
               $("#nazivTVkuce").val("");
               $("#TVkucaSerija").val("");
               $("#manageBtnTVkuca").attr('value', 'Dodaj novu').attr('onclick', "spremiTVkucu('dodajTVkucu')");
               $("#manageBtnTVkuca").show();
            });

            /* Table manager za unos TV kuce */

            $("#dodajTagove").on('click', function () {
                $("#tableManagerTagovi").modal('show');
            });

            $("#tableManagerTagovi").on('hidden.bs.modal', function (){
               $("#showContentTagovi").fadeOut();
               $("#editContentTagovi").fadeIn();
               $("#editRowIDTagovi").val(0);
               $("#Tagovi").val("");
               $("#TagoviSerija").val("");
               $("#manageBtnTagovi").attr('value', 'Dodaj nove').attr('onclick', "spremiTagove('dodajTagove')");
               $("#manageBtnTagovi").show();
            });

            /* Pozivamo funkciju za prikaz podataka */

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
                        $("#nazivTVkuceView").html(response.nazivTVkuce);
                        $("#TagoviView").html(response.Tagovi);
                        $("#manageBtn").hide();
                    } else {
                        $("#editContent").fadeIn();
                        $("#editRowID").val(rowID);
                        $("#showContent").fadeOut();
                        $("#naziv").val(response.naziv);
                        $("#opis").val(response.opis);
                        $("#ocjena").val(response.ocjena);
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

        function spremiTVkucu(key) {
            var nazivTVkuce = $("#nazivTVkuce");
            var TVkucaSerija = $("#TVkucaSerija")
            var editRowIDTVkuca  = $("#editRowIDTVkuca");

            if (isNotEmpty(nazivTVkuce)) {
                $.ajax({
                    url: 'ajax.php',
                    method: 'POST',
                    dataType: 'text',
                    data: {
                        key: key,
                        nazivTVkuce: nazivTVkuce.val(),
                        TVkucaSerija: TVkucaSerija.val(),
                        rowID: editRowIDTVkuca.val()
                    }, success: function (response) {
                        if (response != "success")
                            alert(response);
                        else {
                            $("#TVkuca_"+editRowIDTVkuca.val()).html(nazivTVkuce.val());
                            nazivTVkuce.val('');
                            TVkucaSerija.val('');
                            $("#tableManagerTVkuca").modal('hide');
                            $("#manageBtnTVkuca").attr('value','Dodaj TV kucu').attr('onclick',"spremiTVkucu('dodajTVkucu')");
                            location.reload();
                        }
                    }
                });
            }
        }

        function spremiTagove(key) {
            var Tagovi = $("#Tagovi");
            var TagoviSerija = $("#TagoviSerija")
            var editRowIDTagovi  = $("#editRowIDTagovi");

            if (isNotEmpty(Tagovi)) {
                $.ajax({
                    url: 'ajax.php',
                    method: 'POST',
                    dataType: 'text',
                    data: {
                        key: key,
                        Tagovi: Tagovi.val(),
                        TagoviSerija: TagoviSerija.val(),
                        rowID: editRowIDTagovi.val()
                    }, success: function (response) {
                        if (response != "success")
                            alert(response);
                        else {
                            $("#Tagovi_"+editRowIDTagovi.val()).html(Tagovi.val());
                            Tagovi.val('');
                            TagoviSerija.val('');
                            $("#tableManagerTagovi").modal('hide');
                            $("#manageBtnTagovi").attr('value','Dodaj Tagove').attr('onclick',"spremiTagove('dodajTagove')");
                            location.reload();
                        }
                    }
                });
            }
        }

        function prikaziStatistiku() {
            $.ajax({
                url: 'ajax.php',
                method: 'POST',
                dataType: 'json',
                data: {
                    key: 'viewStatistics',
                }, success: function (response) {
                    $("#broj_serijaView").html(response.brojSerija);
                    $("#broj_glumacaView").html(response.brojGlumaca);
                    $("#broj_tvKucaView").html(response.brojTVkuca);
                    $("#broj_tagovaView").html(response.brojTagova);
                }
            });
            
            $("#tablicaStatistike").modal("show");
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