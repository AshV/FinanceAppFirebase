// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(S) {
    // write your code in JavaScript (Node.js 4.0.0)
    var lines = S.split('\n');
    var TotalBill = 0;
    var AllDurations = [];
    var AllNumbers = [];

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var hh = line[0] + line[1];
        var mm = line[3] + line[4];
        var ss = line[6] + line[7];
        var ph = line[9] + line[10] + line[11] + line[13] + line[14] + line[15] + line[17] + line[18] + line[19];

        var minutes = parseInt(hh) * 60 + parseInt(mm);
        var seconds = parseInt(ss);
        var phone = parseInt(ph);

        AllDurations.push((minutes * 60) + seconds);
        AllNumbers.push(phone);

        if (minutes < 5) {
            TotalBill += ((minutes * 60) + seconds) * 3;
        } else {
            if (seconds === 0) {
                TotalBill += minutes * 150;
            }
            else {
                TotalBill += (minutes + 1) * 150;
            }
        }
    }

    var SortedDurations = AllDurations.slice().sort();
    var countUnique = 0;
    var Max = SortedDurations[SortedDurations.length - 1];

    for (var l = SortedDurations.length - 2; l > 0; --l) {
        if (Max === l)
            countUnique += 1;
        else
            break;
    }

    if (countUnique === 1) {
        if (Max < 300) {
            TotalBill -= Max * 3;
        } else {
            TotalBill -= Math.ceil(Max / 60) * 150;
        }
    } else {
        var indexes = [], j = -1;
        while ((j = AllDurations.indexOf(Max, j + 1)) != -1) {
            indexes.push(j);
        }

        var RelatedPhoneNumbers = [];
        indexes.forEach(function (v, ix, arr) {
            RelatedPhoneNumbers.push(AllNumbers[v]);
        });

        var MinPhone = Math.min.apply(Math, RelatedPhoneNumbers);
        var IndexOfMinPhone = AllNumbers.indexOf(MinPhone);
        var DurationOfMinPhone = AllDurations[IndexOfMinPhone];

        if (DurationOfMinPhone < 300) {
            TotalBill -= DurationOfMinPhone * 3;
        } else {
            TotalBill -= Math.ceil(DurationOfMinPhone / 60) * 150;
        }
    }

    return TotalBill;
}