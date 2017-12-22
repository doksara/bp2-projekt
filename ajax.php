<?php
    if (isset($_POST["key"])) {
        
        $conn = new mysqli("localhost", "root", "", "serije_bp");

        if ($_POST['key'] == 'getRowData') {
            $rowID = $conn->real_escape_string($_POST['rowID']);
            
            $sql_1 = $conn->query("SELECT naziv, opis, ocjena FROM serije WHERE id='$rowID'");
            $sql_2 = $conn->query("SELECT g.naziv FROM glumac g LEFT JOIN serija_glumci sg ON g.id=sg.id_glumca WHERE sg.id_serije='$rowID'");
            $sql_3 = $conn->query("SELECT tv.naziv FROM tv_kuca tv LEFT JOIN serija_tvkuca stv ON tv.id=stv.id_tvKuce WHERE stv.id_serije='$rowID'");
            $sql_4 = $conn->query("SELECT t.tag FROM tagovi t LEFT JOIN serije_tagovi st ON t.id=st.id_taga WHERE st.id_serije='$rowID'");

            $data_1 = $sql_1->fetch_array();
            $data_2 = $sql_2->fetch_array();
            $data_3 = $sql_3->fetch_array();
            $data_4 = $sql_4->fetch_array();

            $jsonArray_1 = array(
                'naziv' => $data_1['naziv'],
                'opis' => $data_1['opis'],
                'ocjena' => $data_1['ocjena'],
            );

            $jsonArray_2 = array(
                'nazivGlumca' => $data_2['naziv'] 
            );

            $jsonArray_3 = array(
                'nazivTVkuce' => $data_3['naziv']
            );

            $jsonArray_4 = array(
                'Tagovi' => $data_4['tag']
            );

            $result = array_merge($jsonArray_1, $jsonArray_2, $jsonArray_3, $jsonArray_4);
            exit(json_encode($result));
        }

        if ($_POST['key'] == 'getExistingData') {
            $start = $conn->real_escape_string($_POST['start']);
            $limit = $conn->real_escape_string($_POST['limit']);

            $sql = $conn->query("SELECT id, naziv, opis, ocjena FROM serije LIMIT $start, $limit");
            if ($sql->num_rows > 0) {
                $response = "";
                while($data = $sql->fetch_array()) {
                    $response .= '
                        <tr>
                            <td>'.$data["id"].'</td>
                            <td id="serije_'.$data["id"].'">'.$data["naziv"].'</td>
                            <td id="serije_'.$data["id"].'">'.$data["opis"].'</td>
                            <td id="serije_'.$data["id"].'">'.$data["ocjena"].'</td>
                            <td>
                                <input type="button" onclick="viewORedit('.$data["id"].', \'edit\')" value="Azuriraj" class="btn btn-primary">
                                <input type="button" onclick="viewORedit('.$data["id"].', \'view\')" value="Pregledaj" class="btn btn-info">
                                <input type="button" onclick="deleteRow('.$data["id"].')" value="Izbrisi" class="btn btn-danger">
                            </td>
                        </tr>
                    ';
                }
                exit($response);
            } else
                exit('reachedMax');
        }

        $rowID = $conn->real_escape_string($_POST['rowID']);

        if ($_POST['key'] == 'deleteRow') {
            $conn->query("DELETE from serije WHERE id='$rowID'");
            exit("Serija je obrisana!");
        }


        if ($_POST['key'] == 'updateRow') {
            $naziv = $conn->real_escape_string($_POST['naziv']);
            $opis = $conn->real_escape_string($_POST['opis']);
            $ocjena = $conn->real_escape_string($_POST['ocjena']);

            $conn->query("UPDATE serije SET naziv='$naziv', opis='$opis', ocjena='$ocjena' WHERE id='$rowID'");
            exit('success');
        }

        if ($_POST["key"] == "dodajNovu") {
            $naziv = $conn->real_escape_string($_POST['naziv']);
            $opis = $conn->real_escape_string($_POST['opis']);
            $ocjena = $conn->real_escape_string($_POST['ocjena']);

            $sql = $conn->query("SELECT id FROM serije WHERE naziv = '$naziv'");
            if ($sql->num_rows > 0)
                exit("TV serija je vec unesena!");
            else {
                $conn->query("INSERT INTO serije (naziv, opis, ocjena)
                              VALUES ('$naziv', '$opis', '$ocjena')");
                exit("success");
            }
        }

        if ($_POST["key"] == "dodajGlumca") {
            $nazivGlumca = $conn->real_escape_string($_POST['nazivGlumca']);
            $spolGlumca = $conn->real_escape_string($_POST['spolGlumca']);
            $datumRodenja = $conn->real_escape_string($_POST['datumRodenja']);
            $glumacSerija = $conn->real_escape_string($_POST['glumacSerija']);

            $sql_1 = $conn->query("SELECT id FROM serije WHERE naziv = '$glumacSerija'");
            if ($sql_1->num_rows < 1)
            {
                exit("Nepostojeca serija!");
            }
            else {
                $redSerija = mysqli_fetch_assoc($sql_1);
                $idSerija = $redSerija["id"];
            }

            $sql_2 = $conn->query("SELECT id FROM glumac WHERE naziv = '$nazivGlumca'");
            if ($sql_2->num_rows > 0)
            {
                exit("Glumac ne moze istovremeno glumiti na 2 TV serije!");
            }
            else {
                $conn->query("INSERT INTO glumac (naziv, spol, datum_rodenja)
                              VALUES ('$nazivGlumca', '$spolGlumca', '$datumRodenja')");

                $sql_3 = $conn->query("SELECT id FROM glumac WHERE naziv = '$nazivGlumca'");
                $redGlumac = mysqli_fetch_assoc($sql_3);
                $idGlumac = $redGlumac["id"];

                $conn->query("INSERT INTO serija_glumci (id_serije, id_glumca)
                              VALUES ('$idSerija', '$idGlumac')");
                exit("success");
            }
        }

        if ($_POST["key"] == "dodajTVkucu") {
            $nazivTVkuce = $conn->real_escape_string($_POST['nazivTVkuce']);
            $TVkucaSerija = $conn->real_escape_string($_POST['TVkucaSerija']);

            $sql_1 = $conn->query("SELECT id FROM serije WHERE naziv = '$TVkucaSerija'");

            if ($sql_1->num_rows < 1)
            {
                exit("Nepostojeca serija!");
            }
            else {
                $redSerija = mysqli_fetch_assoc($sql_1);
                $idSerija = $redSerija["id"];
                $conn->query("INSERT INTO tv_kuca (naziv)
                              VALUES ('$nazivTVkuce')");

                $sql_2 = $conn->query("SELECT id FROM tv_kuca WHERE naziv = '$nazivTVkuce'");
                $redTVkuca = mysqli_fetch_assoc($sql_2);
                $idTVkuca = $redTVkuca["id"];

                $conn->query("INSERT INTO serija_tvkuca (id_serije, id_tvKuce)
                              VALUES ('$idSerija', '$idTVkuca')");
                exit("success");
            }
        }

        if ($_POST["key"] == "dodajTagove") {
            $Tagovi = $conn->real_escape_string($_POST['Tagovi']);
            $TagoviSerija = $conn->real_escape_string($_POST['TagoviSerija']);

            $sql_1 = $conn->query("SELECT id FROM serije WHERE naziv = '$TagoviSerija'");

            if ($sql_1->num_rows < 1)
            {
                exit("Nepostojeca serija!");
            }
            else {
                $redSerija = mysqli_fetch_assoc($sql_1);
                $idSerija = $redSerija["id"];
                $conn->query("INSERT INTO tagovi (tag)
                              VALUES ('$Tagovi')");

                $sql_2 = $conn->query("SELECT id FROM tagovi WHERE tag = '$Tagovi'");
                $redTagovi = mysqli_fetch_assoc($sql_2);
                $idTagovi = $redTagovi["id"];

                $conn->query("INSERT INTO serije_tagovi (id_serije, id_taga)
                              VALUES ('$idSerija', '$idTagovi')");
                exit("success");
            }
        }

        if ($_POST['key'] == 'viewStatistics') {

            $sql = $conn->query("SELECT broj_serija, broj_glumaca, broj_tvKuca, broj_tagova FROM statistika");
            
            $red = fetch_array($sql);

            $jsonArray = array(
                'brojSerija' => $red["broj_serija"],
                'brojGlumaca' => $red['broj_glumaca'],
                'brojTVkuca' => $red['broj_tvKuca'],
                'brojTagova' => $red['broj_tagova']
            );

            exit(json_encode($jsonArray));
        }
    }
?>