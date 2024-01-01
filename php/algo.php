<?php
function customEncode($originalString) {
    // Define an extended random substitution cipher
    $cipher = [
        'a' => 'k8',
        'b' => 's2',
        'c' => '8d',
        'd' => 'p9',
        'e' => 'x4',
        'f' => 'm7',
        'g' => 'a1',
        'h' => 'b3',
        'i' => 'u5',
        'j' => 'q6',
        'k' => 'y0',
        'l' => 'z1',
        'm' => 'w2',
        'n' => 'c3',
        'o' => 'v4',
        'p' => 'n5',
        'q' => 'i6',
        'r' => 'j7',
        's' => 'f8',
        't' => 'h9',
        'u' => 'e0',
        'v' => 'o1',
        'w' => 'g2',
        'x' => 'l3',
        'y' => 't4',
        'z' => 'r5',
        'A' => 'K8',
        'B' => 'S2',
        'C' => '8D',
        'D' => 'P9',
        'E' => 'X4',
        'F' => 'M7',
        'G' => 'A1',
        'H' => 'B3',
        'I' => 'U5',
        'J' => 'Q6',
        'K' => 'Y0',
        'L' => 'Z1',
        'M' => 'W2',
        'N' => 'C3',
        'O' => 'V4',
        'P' => 'N5',
        'Q' => 'I6',
        'R' => 'J7',
        'S' => 'F8',
        'T' => 'H9',
        'U' => 'E0',
        'V' => 'O1',
        'W' => 'G2',
        'X' => 'L3',
        'Y' => 'T4',
        'Z' => 'R5',
        '0' => 'D6',
        '1' => 'S7',
        '2' => 'X8',
        '3' => 'B9',
        '4' => 'P0',
        '5' => 'I1',
        '6' => 'V2',
        '7' => 'N3',
        '8' => 'C4',
        '9' => 'A5',
        // Add more random mappings as needed
    ];

    // Convert each character in the original string based on the cipher
    $encodedString = '';

    for ($i = 0; $i < strlen($originalString); $i++) {
        $char = $originalString[$i];
        $encodedString .= isset($cipher[$char]) ? $cipher[$char] : $char;
    }

    return $encodedString;
}

function customDecode($encodedString) {
    // Define the reverse of the substitution cipher
    $reverseCipher = array_flip([
        'k8' => 'a',
        's2' => 'b',
        '8d' => 'c',
        'p9' => 'd',
        'x4' => 'e',
        'm7' => 'f',
        'a1' => 'g',
        'b3' => 'h',
        'u5' => 'i',
        'q6' => 'j',
        'y0' => 'k',
        'z1' => 'l',
        'w2' => 'm',
        'c3' => 'n',
        'v4' => 'o',
        'n5' => 'p',
        'i6' => 'q',
        'j7' => 'r',
        'f8' => 's',
        'h9' => 't',
        'e0' => 'u',
        'o1' => 'v',
        'g2' => 'w',
        'l3' => 'x',
        't4' => 'y',
        'r5' => 'z',
        'K8' => 'A',
        'S2' => 'B',
        '8D' => 'C',
        'P9' => 'D',
        'X4' => 'E',
        'M7' => 'F',
        'A1' => 'G',
        'B3' => 'H',
        'U5' => 'I',
        'Q6' => 'J',
        'Y0' => 'K',
        'Z1' => 'L',
        'W2' => 'M',
        'C3' => 'N',
        'V4' => 'O',
        'N5' => 'P',
        'I6' => 'Q',
        'J7' => 'R',
        'F8' => 'S',
        'H9' => 'T',
        'E0' => 'U',
        'O1' => 'V',
        'G2' => 'W',
        'L3' => 'X',
        'T4' => 'Y',
        'R5' => 'Z',
        'D6' => '0',
        'S7' => '1',
        'X8' => '2',
        'B9' => '3',
        'P0' => '4',
        'I1' => '5',
        'V2' => '6',
        'N3' => '7',
        'C4' => '8',
        'A5' => '9',
        // Add more reverse mappings as needed
    ]);

    // Convert each character in the encoded string based on the reverse cipher
    $decodedString = '';

    for ($i = 0; $i < strlen($encodedString); $i += 2) {
        $char = substr($encodedString, $i, 2);
        $decodedString .= isset($reverseCipher[$char]) ? $reverseCipher[$char] : $char;
    }

    return $decodedString;
}

// Example usage
$originalString = "aBc123xyzXYZ";
$encodedString = customEncode($originalString);
$decodedString = customDecode($encodedString);

echo "Original String: $originalString\n";
echo "Encoded String: $encodedString\n";
echo "Decoded String: $decodedString\n";
?>
