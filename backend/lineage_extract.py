from sqllineage.runner import LineageRunner
import sys
import json
 
sql = sys.argv[1]
lineage = LineageRunner(sql, dialect='ansi')
lineage_json = json.dumps({
    "source": str(lineage.source_tables),
    "target": str(lineage.target_tables)
})
print (lineage_json)
sys.stdout.flush()

