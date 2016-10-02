param (
	[string]$Config=$(throw "Config is mandatory, please provide a value."),
	[string]$Target=$(throw "Target is mandatory, please provide a value.")
)

Try
{
	Write-Host 'Reading configuration file.'
	$files = Get-Content $Config
}
Catch
{
	Write-Error "Couldn't read $Config file. Please check file path."
	return
}

Write-Host "Building file $Target."

# Create fresh target file
$targetFile = New-Item $Target -Type file -Force

foreach($file in $files)
{
	Write-Host "Adding file $file."
	Get-Content $file | Add-Content $Target
}

Write-Host "Finished building $Target."