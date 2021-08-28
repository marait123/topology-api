$Folder = './samples'

if (Test-Path -Path $Folder) {
    Write-Host "samples folder exists! removing it " -ForegroundColor Green
    Remove-Item $Folder -Recurse
    Write-Host "recreating a samples folder for you" -ForegroundColor Green
    mkdir $Folder
}
else {

    Write-Host "creating a samples folder for you" -ForegroundColor Green
    mkdir $Folder
}

for ($i = 1; $i -lt 10; $i++) {
    $str = Get-Content topology.json -Raw;
    $str = $str.Replace("top1", "top" + $i );
    $str = $str.Replace("n1", "n" + $i );
    # Write-Output $str > $Folder/topology$i.json;
    Set-Content $str -Path $Folder/topology$i.json
    # ((Get-Content -path topology.json -Raw) -replace 'top1', ("top" + $i)) | Set-Content -Path $Folder/topology$i.json
    # cp topology.json $Folder/topology$i.json
}