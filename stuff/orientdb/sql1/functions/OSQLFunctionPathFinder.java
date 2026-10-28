/*
  *
  *  *  Copyright 2014 Orient Technologies LTD (info(at)orientechnologies.com)
  *  *
  *  *  Licensed under the Apache License, Version 2.0 (the "License");
  *  *  you may not use this file except in compliance with the License.
  *  *  You may obtain a copy of the License at
  *  *
  *  *       http://www.apache.org/licenses/LICENSE-2.0
  *  *
  *  *  Unless required by applicable law or agreed to in writing, software
  *  *  distributed under the License is distributed on an "AS IS" BASIS,
  *  *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  *  *  See the License for the specific language governing permissions and
  *  *  limitations under the License.
  *  *
  *  * For more information: http://www.orientechnologies.com
  *
  */
package com.orientechnologies.orient.graph.sql.functions;

import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Map;
import java.util.Set;

import com.orientechnologies.orient.core.command.OCommandContext;
import com.orientechnologies.orient.core.id.ORID;
import com.orientechnologies.orient.core.sql.functions.math.OSQLFunctionMathAbstract;
import com.tinkerpop.blueprints.Direction;
import com.tinkerpop.blueprints.Vertex;
import com.tinkerpop.blueprints.impls.orient.OrientBaseGraph;
import com.tinkerpop.blueprints.impls.orient.OrientVertex;

/**
 * Abstract class to find paths between nodes.
 * 
 * @author Luca Garulli (l.garulli--at--orientechnologies.com)
 * 
 */
public abstract class OSQLFunctionPathFinder extends OSQLFunctionMathAbstract {
  protected OrientBaseGraph         db;
  protected Set<OrientVertex>       unSettledNodes;
  protected Map<ORID, OrientVertex> predecessors;
  protected Map<ORID, Float>        distance;

  protected OrientVertex            paramSourceVertex;
  protected OrientVertex            paramDestinationVertex;
  protected Direction               paramDirection = Direction.OUT;
  protected OCommandContext         context;

  protected static final float      MIN            = 0f;

  public OSQLFunctionPathFinder(final String iName, final int iMinParams, final int iMaxParams) {
    super(iName, iMinParams, iMaxParams);
  }

  protected LinkedList<OrientVertex> execute(final OCommandContext iContext) {
    context = iContext;
    unSettledNodes = new HashSet<OrientVertex>();
    distance = new HashMap<ORID, Float>();
    predecessors = new HashMap<ORID, OrientVertex>();
    distance.put(paramSourceVertex.getIdentity(), MIN);
    unSettledNodes.add(paramSourceVertex);

    int maxDistances = 0;
    int maxSettled = 0;
    int maxUnSettled = 0;
    int maxPredecessors = 0;

    while (continueTraversing()) {
      final OrientVertex node = getMinimum(unSettledNodes);
      unSettledNodes.remove(node);
      findMinimalDistances(node);

      if (distance.size() > maxDistances)
        maxDistances = distance.size();
      if (unSettledNodes.size() > maxUnSettled)
        maxUnSettled = unSettledNodes.size();
      if (predecessors.size() > maxPredecessors)
        maxPredecessors = predecessors.size();

      if (!isVariableEdgeWeight() && distance.containsKey(paramDestinationVertex.getIdentity()))
        // FOUND
        break;

      if (!context.checkTimeout())
        break;
    }

    context.setVariable("maxDistances", maxDistances);
    context.setVariable("maxSettled", maxSettled);
    context.setVariable("maxUnSettled", maxUnSettled);
    context.setVariable("maxPredecessors", maxPredecessors);

    distance = null;

    return getPath();
  }

  protected boolean isVariableEdgeWeight() {
    return false;
  }

  /*
   * This method returns the path from the source to the selected target and NULL if no path exists
   */
  public LinkedList<OrientVertex> getPath() {
    final LinkedList<OrientVertex> path = new LinkedList<OrientVertex>();
    OrientVertex step = paramDestinationVertex;
    // Check if a path exists
    if (predecessors.get(step.getIdentity()) == null)
      return null;

    path.add(step);
    while (predecessors.get(step.getIdentity()) != null) {
      step = predecessors.get(step.getIdentity());
      path.add(step);
    }
    // Put it into the correct order
    Collections.reverse(path);
    return path;
  }

  public boolean aggregateResults() {
    return false;
  }

  @Override
  public Object getResult() {
    return getPath();
  }

  protected void findMinimalDistances(final OrientVertex node) {
    for (OrientVertex neighbor : getNeighbors(node)) {
      final float d = sumDistances(getShortestDistance(node), getDistance(node, neighbor));

      if (getShortestDistance(neighbor) > d) {
        distance.put(neighbor.getIdentity(), d);
        predecessors.put(neighbor.getIdentity(), node);
        unSettledNodes.add(neighbor);
      }
    }

  }

  protected Set<OrientVertex> getNeighbors(final Vertex node) {
    context.incrementVariable("getNeighbors");

    final Set<OrientVertex> neighbors = new HashSet<OrientVertex>();
    if (node != null) {
      for (Vertex v : node.getVertices(paramDirection)) {
        final OrientVertex ov = (OrientVertex) v;
        if (ov != null && isNotSettled(ov))
          neighbors.add(ov);
      }
    }
    return neighbors;
  }

  protected OrientVertex getMinimum(final Set<OrientVertex> vertexes) {
    OrientVertex minimum = null;
    Float minimumDistance = null;
    for (OrientVertex vertex : vertexes) {
      if (minimum == null || getShortestDistance(vertex) < minimumDistance) {
        minimum = vertex;
        minimumDistance = getShortestDistance(minimum);
      }
    }
    return minimum;
  }

  protected boolean isNotSettled(final OrientVertex vertex) {
    return unSettledNodes.contains(vertex) || !distance.containsKey(vertex.getIdentity());
  }

  protected boolean continueTraversing() {
    return unSettledNodes.size() > 0;
  }

  protected float getShortestDistance(final OrientVertex destination) {
    if (destination == null)
      return Float.MAX_VALUE;

    final Float d = distance.get(destination.getIdentity());
    return d == null ? Float.MAX_VALUE : d;
  }

  protected float sumDistances(final float iDistance1, final float iDistance2) {
    return iDistance1 + iDistance2;
  }

  protected abstract float getDistance(final OrientVertex node, final OrientVertex target);
}
