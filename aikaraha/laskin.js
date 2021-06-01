$(document).ready(function () {
    $("input").keyup(function () {
      Laske();
    });
    $("#tyel").change(function () {
      Laske();
    });

    function Laske() {
      let palkka = $("#palkka").val();
      palkka = Number(palkka);

      let vero_pros = $("#veropros").val();
      vero_pros = Number(vero_pros);
      vero_pros = vero_pros / 100;

      let tunnit_viikossa = $("#tunti").val();
      tunnit_viikossa = Number(tunnit_viikossa);

      let ostettava = $("#osto").val();
      ostettava = Number(ostettava);

      let tyel = 0.0715;
      let ttel = 0.014;
      // Laske Nettopalkka
      if ($("#tyel").prop("checked")) {
        tyel = palkka * tyel;
        ttel = palkka * ttel;
        let veron_määrä = palkka * vero_pros;
        palkka = palkka - veron_määrä - tyel - ttel;
      } else {
        palkka = palkka - palkka * vero_pros;
      }
      if (Number(palkka) && Number(vero_pros)) {
        palkka = palkka.toFixed(2);
        $("#netto").html(palkka + " €");
      }

      // Laske tuntipalkka
      let tunnit_kuussa = tunnit_viikossa * 4;
      let tuntipalkka = palkka / tunnit_kuussa;
      tuntipalkka = tuntipalkka.toFixed(2);

      if (Number(tunnit_viikossa)) {
        $("#tuntipalkka").html(tuntipalkka + " €");
      }

      // Jaa ostettavan tuotteen hinta
      let tyomaara = Number(ostettava) / Number(tuntipalkka);
      let tunnit = parseInt(tyomaara);
      let minuutit = (tyomaara - tunnit) * 60;
      minuutit = parseInt(minuutit);

      if (Number(ostettava)) {
        $("#tyomaara").html(
          tunnit.toString() + " h " + minuutit.toString() + " min"
        );
      } else {
        $("#tyomaara").html("vähän");
      }
    }
  });