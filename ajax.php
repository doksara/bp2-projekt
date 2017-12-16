<?php
    if (isset($_POST["key"])) {
        
        $conn = new mysqli("localhost", "root", "", "serije_bp");

        if ($_POST['key'] == 'getRowData') {
            $rowID = $conn->real_escape_string($_POST['rowID']);
            $sql = $conn->query("SELECT naziv, opis, ocjena FROM serije WHERE id='$rowID'");
            $data = $sql->fetch_array();
            $jsonArray = array(
                'naziv' => $data['naziv'],
                'opis' => $data['opis'],
                'ocjena' => $data['ocjena'],
            );

            exit(json_encode($jsonArray));
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

        $naziv = $conn->real_escape_string($_POST['naziv']);
        $opis = $conn->real_escape_string($_POST['opis']);
        $ocjena = $conn->real_escape_string($_POST['ocjena']);


        if ($_POST['key'] == 'updateRow') {
            $conn->query("UPDATE serije SET naziv='$naziv', opis='$opis', ocjena='$ocjena' WHERE id='$rowID'");
            exit('success');
        }

        if ($_POST["key"] == "dodajNovu") {
            $sql = $conn->query("SELECT id FROM serije WHERE naziv = '$naziv'");
            if ($sql->num_rows > 0)
                exit("TV serija je vec unesena!");
            else {
                $conn->query("INSERT INTO serije (naziv, opis, ocjena)
                              VALUES ('$naziv', '$opis', '$ocjena')");
                exit("success");
            }
        }
    }
?>