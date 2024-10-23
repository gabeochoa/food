function find_matching_ids(cmps){
    let ids = [];
    for(let cmp of cmps){
        ids = ids.concat(EC[cmp.name]).unique()
    }
    return ids;
}

function for_components(cmps, cb){
    let ids = find_matching_ids(cmps)
    for(let id of ids){
        e = entities[id];
        if(e == null || e == undefined){
            // console.warn("Entity ", id, " not found")
            continue;
        }
        let components = cmps.map(cmp => {
            return e[cmp.name]
        })
        cb(e, ...components)
    }
}

function to_ents(ids){
    let ents = [];
    for(let id of ids){
        e = entities[id];
        if(e == null || e == undefined){
            // console.warn("Entity ", id, " not found")
            continue;
        }
        ents.push(e)
    }
    return ents;
}

function find_closest_with(cmp, position, filter_fn){
    let ids = find_matching_ids([cmp])
    let closest = null;
    for(let id of ids){
        e = entities[id];
        if(e == null || e == undefined){
            // console.warn("Entity ", id, " not found")
            continue;
        }
        if(filter_fn && !filter_fn(e)){
            continue;
        }
        if(closest == null){
            closest = e.id
            continue;
        }
        if(distance(position, e.pos) < distance(position, closest.pos)){
            closest = e.id
            continue;
        }
    }
    return closest;
}

function count_entities_with(cmp){
    let ids = to_ents(find_matching_ids([cmp]))
    return ids.length;
}
